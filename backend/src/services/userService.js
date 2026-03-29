const prisma = require("../config/prismaClient.js");
const {
    hashPassword,
    encrypt,
    generateGUID,
    comparePassword,
    decrypt
} = require('../services/cryptoService');
const { DateTime } = require('luxon');




const createUser = async (data) => {

    const email = data.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const role = data.role;
    const password = data.password;


    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });

    if (existingUser) {
        throw new Error('A user with this email already exists');
    }




    if(role === 'PATIENT') {
        const phone = data.phone;

        const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?([-.\s]?\d{1,9}){1,3}$/;

        if (!phoneRegex.test(phone)) {
            throw new Error('Invalid phone number format.');
        }

        return await prisma.$transaction(async (tx) => {
            const user = await createUserEntity(tx, email, password, role);

            await tx.patient.create({
                data: {
                    user_id:      user.user_id,
                    address:      encrypt(data.address),
                    phone:        encrypt(data.phone),
                    patient_code: generateGUID(),
                    diagnosis:    encrypt(data.diagnosis),
                    birth_date:   encrypt(data.birth_date.toString()),
                    name:         encrypt(data.name),
                    active:       true
                }
            });

            return user;
        });

        // const user = await createUserEntity(data.email, data.password, role);
        // await prisma.patient.create({
        //     data: {
        //         user_id: user.user_id,
        //         address : encrypt(data.address),
        //         phone : encrypt(data.phone),
        //         patient_code : generateGUID(),
        //         diagnosis : encrypt(data.diagnosis),
        //         birth_date: encrypt(data.birth_date.toString()),
        //         name   : encrypt(data.name),
        //         active :  true
        //     }
        // });
        // return user;
    } else if (role === 'CAREGIVER') {
        const phone = data.phone;
        const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?([-.\s]?\d{1,9}){1,3}$/;

        if (!phoneRegex.test(phone)) {
            throw new Error('Invalid phone number format.');
        }
        return await prisma.$transaction(async (tx) => {
            const user = await createUserEntity(tx, email, password, role);

            await tx.caregiver.create({
                data: {
                    user_id:            user.user_id,
                    address:            data.address,
                    name:               data.name,
                    phone:              data.phone,
                    approved:           false,
                    approved_date_time: null
                }
            });

            return user;
        });
        // const user = await createUserEntity(data.email, data.password, role);
        // await prisma.caregiver.create({
        //     data: {
        //         user_id: user.user_id,
        //         address :  data.address,
        //         name     :  data.name,
        //         phone  :  data.phone,
        //         approved : false,
        //         approved_date_time : null
        //     }
        // });
        // return user;
    } else if (role === 'ADMIN') {
        return await prisma.$transaction(async (tx) => {
            return await createUserEntity(tx, email, password, role);
        });
    } else {
        throw new Error('Wrong users role');
    }


}

async function createUserEntity(tx,email, password, role) {
    const now = DateTime.now();
    const hashedPassword = await hashPassword(password);
    const user = await tx.user.create({
        data: {
            email: email,
            password: hashedPassword,
            role: role,
            created_date_time : now.toJSDate()
        }
    })
    return user;
}

// const approveCaregiver = async (data) => {
//     const now = DateTime.now();
//     const caregiver = await prisma.caregiver.findFirst({
//         where: { user_id: data.user_id },
//     })
//
//     const updated = await prisma.caregiver.update({
//         where: { caregiver_id: caregiver.caregiver_id },
//         data: {
//             approved: true,
//             approved_date_time: now.toJSDate(),
//         }
//     })
//     return updated;
// }


const loginUser = async (data) => {
    const email = data.email;
    const password = data.password;
    const existingUser = await prisma.user.findUnique({
        where: { email: email },
        include: {
            Patient:  true,
            Caregiver: true
        }
    });
    if (!existingUser) {
        throw new Error('Invalid password/email  exists');
    }
    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) {
        throw new Error('Invalid password/email  exists');
    }



    let profile = null;
    if (existingUser.role === 'PATIENT' && existingUser.Patient.length > 0) {
        const p = existingUser.Patient[0];
        profile = {
            patient_id:   p.patient_id,
            name:         decrypt(p.name),
            phone:        decrypt(p.phone),
            address:      decrypt(p.address),
            diagnosis:    decrypt(p.diagnosis),
            birth_date:   decrypt(p.birth_date),
            patient_code: p.patient_code,
            active:       p.active
        };
    } else if (existingUser.role === 'CAREGIVER' && existingUser.Caregiver.length > 0) {
        const c = existingUser.Caregiver[0];
        profile = {
            caregiver_id: c.caregiver_id,
            name:         c.name,
            phone:        c.phone,
            address:      c.address,
            approved:     c.approved
        };
    }

    return {
        user_id:           existingUser.user_id,
        email:             existingUser.email,
        role:              existingUser.role,
        profile
    };
}

const writeLog = async (login,description) => {
    const now = DateTime.now();

    const log = await prisma.log.create({
        data: {
            log_datetime: now.toJSDate(),
            log_description: description,
            login: login,
        }
    })
    return log;
}


// module.exports = { createUser, approveCaregiver, loginUser };
module.exports = { createUser, loginUser,writeLog };
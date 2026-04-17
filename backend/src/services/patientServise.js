const prisma = require("../config/prismaClient.js");
const {decrypt,encrypt} = require('../services/cryptoService');



const deactivatePatient = async (data) => {
    const patient = await prisma.patient.findFirst({
        where: { user_id: data.user_id },
    })

    // await prisma.PatientCaregiver.updateMany({
    //     where: {patient_id: patient.patient_id},
    //     data: {
    //         active: false
    //     }
    // })
    //
    // const updated = await prisma.patient.update({
    //     where: { patient_id: patient.patient_id },
    //     data: {
    //         active: false
    //     }
    // })
    // return updated;


    return await prisma.$transaction(async (tx) => {

        const updated = await tx.patient.update({
            where: { patient_id: patient.patient_id },
            data: {
                active: false
            }
        });

        const pcs = await tx.patientCaregiver.findMany({
            where: { patient_id: patient.patient_id },
            select: { pc_id: true }
        });

        await tx.patientCaregiver.updateMany({
            where: { patient_id: patient.patient_id },
            data: { active: false }
        });

        await tx.task.deleteMany({
            where: {
                pc_id: {
                    in: pcs.map(p => p.pc_id)
                },
                is_completed : false
            }
        });

        await tx.recurrenceRule.deleteMany({
            where: {
                Task: {
                    none: {}
                }
            }
        });


        return updated;
    });
}


// const searchPatient = async (data) => {
//     return  patient = await prisma.patient.findFirst({
//         where: { patient_code: data.patient_code },
//     })
// }
//

const searchPatient = async (data) => {
    const patient = await prisma.patient.findFirst({
        where: { patient_code: data.patient_code },
        include: {
            user: true
        }
    });

    if (!patient || !patient.active) throw new Error('Patient not found');

    const birthDate = new Date(decrypt(patient.birth_date));
    const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));


    return {
        patient_id:   patient.patient_id,
        user_id:      patient.user.user_id,
        email:        patient.user.email,
        patient_code: patient.patient_code,
        name_initial: decrypt(patient.name)[0].toUpperCase(),
        approx_age:   age
    }


}

const updatePatient = async (data) => {
    const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?([-.\s]?\d{1,9}){1,3}$/;

    const patientId = Number(data.patient_id);

    const name = data.name;
    const phone = data.phone;
    const address = data.address;
    const diagnosis = data.diagnosis;
    const birth_date = data.birth_date;

    if (!patientId) throw new Error('Invalid patient_id');

    const existingPatient = await prisma.patient.findFirst({
        where: { patient_id: patientId },
    });

    if (!existingPatient) throw new Error('Patient not exist');

    if (existingPatient.active !== true)
        throw new Error('Patient not active');

    if (!name || !name.trim()) throw new Error('Name must not be empty');
    if (!phone || !phone.trim()) throw new Error('Phone must not be empty');
    if (!phoneRegex.test(phone)) throw new Error('Invalid phone format');
    if (!address || !address.trim()) throw new Error('Address must not be empty');
    if (!diagnosis || !diagnosis.trim()) throw new Error('Diagnosis must not be empty');

    if (!birth_date) throw new Error('Birth date must not be empty');

    const updatedPatient = await prisma.patient.update({
        where: { patient_id: patientId },
        data: {
            name: encrypt(name),
            phone: encrypt(phone),
            address: encrypt(address),
            diagnosis: encrypt(diagnosis),
            birth_date: encrypt(new Date(birth_date).toISOString()),
        }
    });

    return {
        patient_id: updatedPatient.patient_id,
        patient_code: updatedPatient.patient_code,
        active: updatedPatient.active,

        name: decrypt(updatedPatient.name),
        phone: decrypt(updatedPatient.phone),
        address: decrypt(updatedPatient.address),
        diagnosis: decrypt(updatedPatient.diagnosis),
        birth_date: new Date(decrypt(updatedPatient.birth_date)).toISOString(),
    };
};

const getPatientProfileById = async (data) => {
    const patient_id = Number(data.patient_id);

    if (!patient_id) throw new Error('Invalid patient_id');

    const p = await prisma.patient.findFirst({
        where: { patient_id: patient_id },
    });

    if (!p) throw new Error('Patient not exist');

    return {
        patient_id: p.patient_id,
        patient_code: p.patient_code,
        active: p.active,

        name: decrypt(p.name),
        phone: decrypt(p.phone),
        address: decrypt(p.address),
        diagnosis: decrypt(p.diagnosis),
        birth_date: new Date(decrypt(p.birth_date)).toISOString(),
    };
};
module.exports = {deactivatePatient, searchPatient,updatePatient,getPatientProfileById};
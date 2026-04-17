const prisma = require("../config/prismaClient.js");
const { DateTime } = require('luxon');


const approveCaregiver = async (data) => {
    const now = DateTime.now();
    const caregiver = await prisma.caregiver.findFirst({
        where: { user_id: data.user_id },
    })

    const updated = await prisma.caregiver.update({
        where: { caregiver_id: caregiver.caregiver_id },
        data: {
            approved: true,
            approved_date_time: now.toJSDate(),
        }
    })
    return updated;
}


const getAllPatientsForCaregiver = async (data) => {

    const caregiver_id = Number(data.caregiver_id);

    const patientCaregiversList = await prisma.patientCaregiver.findMany({
        where: {
            caregiver_id: caregiver_id,
            active: true
        }
    });

    return patientCaregiversList;

}



const updateCaregiver = async (data) => {

    const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?([-.\s]?\d{1,9}){1,3}$/;
    const caregiverId = data.caregiver_id;
    const name = data.name;
    const phone = data.phone;
    const address = data.address;

    const existingCaregiver = await prisma.caregiver.findFirst({
        where: { caregiver_id: caregiverId },
    });

    if (!existingCaregiver) throw new Error('Caregiver not exist');

    if (existingCaregiver.approved !== true)
        throw new Error('Caregiver not approved');

    if (!name || !name.trim()) throw new Error('Name must not be empty');
    if (name.length > 50) throw new Error('Name max length is 50');

    if (!phone || !phone.trim()) throw new Error('Phone must not be empty');
    if (phone.length > 255) throw new Error('Phone max length is 255');
    if (!phoneRegex.test(phone)) throw new Error('Invalid phone format');

    if (!address || !address.trim()) throw new Error('Address must not be empty');
    if (address.length > 255) throw new Error('Address max length is 255');

    const updatedCaregiver = await prisma.caregiver.update({
        where: { caregiver_id: caregiverId },
        data: {
            name,
            phone,
            address,
        }
    });

    return updatedCaregiver;
};



const getCaregiverProfileById = async (data) => {
    const caregiver_id = Number(data.caregiver_id);


    const c = await prisma.caregiver.findFirst({
        where: { caregiver_id: caregiver_id },
    });

    if (!c) throw new Error('Caregiver not exist');

    return {
        caregiver_id: c.caregiver_id,
        name: c.name,
        phone: c.phone,
        address: c.address,
        approved: c.approved
    };
};
module.exports = { approveCaregiver, getAllPatientsForCaregiver, updateCaregiver,getCaregiverProfileById};

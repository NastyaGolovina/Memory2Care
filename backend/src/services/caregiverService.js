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




module.exports = { approveCaregiver, getAllPatientsForCaregiver};

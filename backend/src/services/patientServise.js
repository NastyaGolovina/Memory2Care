const prisma = require("../config/prismaClient.js");




const deactivatePatient = async (data) => {
    const patient = await prisma.patient.findFirst({
        where: { user_id: data.user_id },
    })

    const updated = await prisma.patient.update({
        where: { patient_id: patient.patient_id },
        data: {
            active: false
        }
    })
    return updated;
}


module.exports = {deactivatePatient};
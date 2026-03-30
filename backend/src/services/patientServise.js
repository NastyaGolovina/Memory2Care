const prisma = require("../config/prismaClient.js");
const {decrypt} = require('../services/cryptoService');




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


module.exports = {deactivatePatient, searchPatient};
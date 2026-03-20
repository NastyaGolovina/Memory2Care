const prisma = require("../config/prismaClient.js");

const { DateTime } = require('luxon');


const SupportLevel = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
};


const RelationshipType = {
    FAMILY_MEMBER: "FAMILY_MEMBER",
    INFORMAL_CARETAKER: "INFORMAL_CARETAKER",
    MEDICAL_CARETAKER: "MEDICAL_CARETAKER"
};

const createPatientCaregiver = async (data) => {

    const patientId   = data.patient_id;
    const caregiverId = data.caregiver_id;
    const relationship = data.relationship;
    const supportLevel = data.support_level;
    const approxAge   = data.approx_age;
    const anonName    = data.anon_name;

    const patient = await prisma.patient.findFirst({
        where: { patient_id: patientId },
    });

    const caregiver = await prisma.caregiver.findFirst({
        where: { caregiver_id: caregiverId },
    });

    const patient_caregiver = await prisma.PatientCaregiver.findFirst({
        where: { caregiver_id: caregiverId,
            patient_id: patientId },
    });



    if (!patient)        throw new Error('Patient not found');
    if (!patient.active) throw new Error('Patient is deactivated');

    if (!caregiver)           throw new Error('Caregiver not found');
    if (!caregiver.approved)  throw new Error('Caregiver is not approved');

    if (patient_caregiver && patient_caregiver.active) throw new Error('This caregiver is already assigned to this patient');

    if (!Object.values(RelationshipType).includes(relationship)) throw new Error('Invalid relationship type');
    if (!Object.values(SupportLevel).includes(supportLevel))     throw new Error('Invalid support level');

    if (!Number.isInteger(approxAge) || approxAge <= 0) throw new Error('Invalid approximate age');
    if (typeof anonName !== 'string' || anonName.length <= 0) throw new Error('Invalid anonymous name');


    const patientCaregiver = await prisma.PatientCaregiver.create({
        data: {
            patient_id: patientId,
            caregiver_id: caregiverId,
            relationship: relationship,
            support_level : supportLevel,
            approx_age : approxAge,
            anon_name : anonName,
            active : true,
            assignment_date : DateTime.now().toJSDate()

        }
    });

    return patientCaregiver;

}

module.exports = { createPatientCaregiver };
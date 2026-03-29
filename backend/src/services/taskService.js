// const prisma = require("../config/prismaClient.js");
//
//
//
// //
// //
// // model Task {
// //     task_id             Int              @id @default(autoincrement())
// //     pc_id               Int
// //     task_type_id        Int
// //
// //     pc                  PatientCaregiver @relation(fields: [pc_id], references: [pc_id])
// //     task_type           TaskType         @relation(fields: [task_type_id], references: [task_type_id])
// //
// //     recurrence_task_id  String
// //
// //     task_description    String           @db.Char(225)
// //     execution_date      DateTime         @db.Date
// //     end_date            DateTime         @db.Date
// //     creation_date       DateTime         @default(now())
// //     is_recurring        Boolean
// //     recurrence_rule     String?          @db.Char(225)
// //         // может быть что то еще
// //         is_completed        Boolean          @default(false)
// // }
//
//
// const createTask = async (data) => {
//
//
//     const pcId   = data.pc_id;
//     const taskTypeId = data.task_type_id;
//     const taskDescription = data.task_description;
//     const creationDate = data.creation_date;
//     const approxAge   = data.approx_age;
//     const anonName    = data.anon_name;
//
//
//     validateTaskType(task_type_name,type_desc);
//
//
//
//     const task_type = await prisma.taskType.create({
//         data: {
//             task_type_name: task_type_name,
//             type_desc: type_desc
//         }
//     });
//
//     return task_type;
//
// }
//
//
//
//
// const createPatientCaregiver = async (data) => {
//
//     const patientId   = data.patient_id;
//     const caregiverId = data.caregiver_id;
//     const relationship = data.relationship;
//     const supportLevel = data.support_level;
//     const approxAge   = data.approx_age;
//     const anonName    = data.anon_name;
//
//     const patient = await prisma.patient.findFirst({
//         where: { patient_id: patientId },
//     });
//
//     const caregiver = await prisma.caregiver.findFirst({
//         where: { caregiver_id: caregiverId },
//     });
//
//     // const patient_caregiver = await prisma.PatientCaregiver.findFirst({
//     //     where: { caregiver_id: caregiverId,
//     //         patient_id: patientId },
//     // });
//
//     const existingCaregiver = await prisma.PatientCaregiver.findFirst({
//         where: {
//             patient_id: patientId,
//             active: true
//         },
//     });
//
//
//
//     if (!patient)        throw new Error('Patient not found');
//     if (!patient.active) throw new Error('Patient is deactivated');
//
//     if (!caregiver)           throw new Error('Caregiver not found');
//     if (!caregiver.approved)  throw new Error('Caregiver is not approved');
//
//     // if (patient_caregiver && patient_caregiver.active) throw new Error('This caregiver is already assigned to this patient');
//
//     if (existingCaregiver) throw new Error('Patient already has a caregiver');
//
//     if (!Object.values(RelationshipType).includes(relationship)) throw new Error('Invalid relationship type');
//     if (!Object.values(SupportLevel).includes(supportLevel))     throw new Error('Invalid support level');
//
//     if (!Number.isInteger(approxAge) || approxAge <= 0) throw new Error('Invalid approximate age');
//     if (typeof anonName !== 'string' || anonName.length <= 0 || anonName.length > 225) throw new Error('Invalid anonymous name');
//
//
//     const patientCaregiver = await prisma.PatientCaregiver.create({
//         data: {
//             patient_id: patientId,
//             caregiver_id: caregiverId,
//             relationship: relationship,
//             support_level : supportLevel,
//             approx_age : approxAge,
//             anon_name : anonName,
//             active : true,
//             assignment_date : DateTime.now().toJSDate()
//
//         }
//     });
//
//     return patientCaregiver;
//
// }
//
//
// const createRecurrenceTask = async (data) => {
//
//     const task_type_name   = data.task_type_name;
//     const type_desc = data.type_desc;
//
//
//     validateTaskType(task_type_name,type_desc);
//
//
//
//     const task_type = await prisma.taskType.create({
//         data: {
//             task_type_name: task_type_name,
//             type_desc: type_desc
//         }
//     });
//
//     return task_type;
//
// }

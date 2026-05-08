const prisma = require("../config/prismaClient");
const { DateTime } = require('luxon');



const getStats = async () => {

    const activePatients = await prisma.patient.count({
        where: {
            active: true,
        }
    });

    const approvedCaregivers = await prisma.caregiver.count({
        where: {
            approved: true,
        }
    });

    const totalTasks = await prisma.task.count();

    const completedTasks = await prisma.task.count({
        where: {
            is_completed: true,
        }
    });

    const uncompletedTasks = await prisma.task.count({
        where: {
            is_completed: false,
        }
    });


    return {
        activePatients,
        approvedCaregivers,
        task: {
            totalTasks,
            completedTasks,
            uncompletedTasks,
        }
    };
}



const getUsers = async () => {

    const users = await prisma.user.findMany({
        include: {

            Patient: {
                select: {
                    patient_id: true,
                    patient_code: true,
                    active: true,
                }
            },

            Caregiver: {
            }

        }
    });

    const result = [];

    for (const user of users) {
        result.push({
            user_id: user.user_id,
            email: user.email,
            role: user.role,
            created_date_time: user.created_date_time,
            patient: user.Patient?.[0] || null,
            caregiver: user.Caregiver?.[0] || null,
        });
    }
    return  result
}

const getLogsCountByPeriod = async (data) => {
    const startDate = DateTime.fromISO(data.start_date, { zone: 'utc' }).startOf('day');
    const endDate   = DateTime.fromISO(data.end_date, { zone: 'utc' }).endOf('day');

    if (!startDate.isValid) throw new Error('Start date is not valid. Expected format: YYYY-MM-DD');
    if (!endDate.isValid)   throw new Error('End date is not valid. Expected format: YYYY-MM-DD');
    if (endDate < startDate) throw new Error('End date must be later than start date');

    const count = await prisma.log.count({
        where: {
            log_datetime: {
                gte: startDate.toJSDate(),
                lte: endDate.toJSDate(),
            }
        }
    });

    return count;
}



module.exports = {getUsers,getStats,getLogsCountByPeriod };
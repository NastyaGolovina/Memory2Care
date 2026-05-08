const prisma = require("../config/prismaClient");




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

    return users.map(user => ({
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        created_date_time: user.created_date_time,

        patient: user.Patient[0] || null,

        caregiver: user.Caregiver[0] || null,
    }));
}

// module.exports = { getLogs, getTasksStats,getLogsCountByPeriod,getUsers };
module.exports = {getUsers };
const prisma = require("../config/prismaClient.js");
const { DateTime } = require('luxon');
const {encrypt, generateGUID} = require("./cryptoService");



async function validateTaskVariables(pcId,taskTypeId,taskDescription,startTime,endTime) {
    if (!pcId)         throw new Error('Patient-caregiver ID is required');
    if (!taskTypeId)  throw new Error('Task type ID is required');


    const patientCaregiver = await prisma.patientCaregiver.findFirst({
        where: { pc_id: pcId },
    });

    const taskType = await prisma.taskType.findFirst({
        where: { task_type_id: taskTypeId },
    });


    if (!patientCaregiver)        throw new Error('The specified patient-caregiver relationship was not found');
    if (!patientCaregiver.active) throw new Error('This patient-caregiver relationship is currently deactivated');

    if (!taskType) throw new Error('The specified task type does not exist');





    if (!startTime)     throw new Error('Start time is required');
    if (!endTime)       throw new Error('End time is required');

    if (typeof taskDescription !== 'string' || taskDescription.length <= 0 || taskDescription.length > 225) {
        throw new Error('Task description must be between 1 and 225 characters');
    }


    if (!startTime.isValid) throw new Error('Start time is not valid. Expected format: HH:MM:SS');
    if (!endTime.isValid)   throw new Error('End time is not valid. Expected format: HH:MM:SS');
    if (endTime <= startTime) throw new Error('End time must be later than start time');

}

function getRecurrenceTaskDates(recurrenceRule, startDate, endDate) {

    const type = recurrenceRule.RecurrencePattern.Type;
    const obj = recurrenceRule.RecurrencePattern[type];
    const executionDates = [];
    if (type === "Daily") {
        if(obj.EveryWeekday) {
            const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            let current = startDate;

            while (current <= endDate) {
                if (workDays.includes(current.weekdayLong)) {
                    executionDates.push(current.toISODate());
                }
                current = current.plus({ days: 1 });
            }
        } else {
            let current = startDate;
            let step =  obj.Every;
            while (current <= endDate) {
                executionDates.push(current.toISODate());
                current = current.plus({ days: step });
            }
        }

    } else if (type === "Weekly") {


        const days = obj.DayOfWeek;
        const step = obj.RecurEveryWeek;


        let weekStart = startDate.startOf('week');

        while (weekStart <= endDate) {

            for (let i = 0; i < 7; i++) {
                const current = weekStart.plus({ days: i });

                if (current < startDate) continue;
                if (current > endDate)   break;

                if (days.includes(current.weekdayLong)) {
                    executionDates.push(current.toISODate());
                }
            }

            weekStart = weekStart.plus({ weeks: step });
        }


    } else if (type === "Monthly") {


        const day  = obj.Day;
        const step = obj.EveryMonths;


        let current = startDate.set({ day });


        if (current < startDate) {
            current = current.plus({ months: step });
        }

        while (current <= endDate) {

            if (current.isValid) {
                executionDates.push(current.toISODate());
            }
            current = current.plus({ months: step });
        }

    } else  {
        throw new Error('Wrong recurrence rule type')
    }

    return executionDates;

}
const createTask = async (data) => {


    const pcId   = data.pc_id;
    const taskTypeId = data.task_type_id;
    const taskDescription = data.task_description;
    const executionDate =  DateTime.fromISO(data.execution_date);
    const startTime   = DateTime.fromFormat(data.start_time, 'HH:mm:ss');
    const endTime    = DateTime.fromFormat(data.end_time,'HH:mm:ss');



    await validateTaskVariables(pcId,taskTypeId,taskDescription,startTime,endTime);
    if (!executionDate) throw new Error('Execution date is required');

    if (!executionDate.isValid) throw new Error('Execution date is not valid. Expected format: YYYY-MM-DD');


    const task = await prisma.task.create({
        data: {
            pc_id: pcId,
            task_type_id: taskTypeId,
            recurrence_rule_id: null,
            task_description: taskDescription,
            execution_date : executionDate.toJSDate(),
            start_time :  startTime.toJSDate(),
            end_time : endTime.toJSDate(),
            is_recurring : false,
            is_completed : false

        }
    });

    return task;


}


//
//     "RecurrencePattern" :
//     {
//         "Type" : "Daily | Weekly | Monthly",
//         "Daily" : {
//         "Every" : 1,
//             "EveryWeekday" : False
//     },
//         "Weekly" : {
//         "RecurEveryWeek" : 1,
//             "DayOfWeek" : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
// ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
//     }
//         "Monthly" : {
//         "Day" : 29,
//         "EveryMonths" : 1
//     }
//     }
// }
//


const createRecurrenceTask = async (data) => {

    const pcId   = data.pc_id;
    const taskTypeId = data.task_type_id;
    const taskDescription = data.task_description;

    const startTime = DateTime.fromFormat(data.start_time, 'HH:mm:ss');
    const endTime   = DateTime.fromFormat(data.end_time,   'HH:mm:ss');

    const recurrenceRule = typeof data.recurrence_pattern === 'string'
        ? JSON.parse(data.recurrence_pattern)
        : data.recurrence_pattern;
    const startDate = DateTime.fromISO(data.start_date);
    const endDate   = DateTime.fromISO(data.end_date);



    await validateTaskVariables(pcId,taskTypeId,taskDescription,startTime,endTime);



    if (!data.start_date) throw new Error('Start date is required');
    if (!data.end_date)   throw new Error('End date is required');

    if (!startDate.isValid) throw new Error('Start date is not valid. Expected format: YYYY-MM-DD');
    if (!endDate.isValid)   throw new Error('End date is not valid. Expected format: YYYY-MM-DD');
    if (endDate <= startDate) throw new Error('End date must be later than start date');


    if (!recurrenceRule || typeof recurrenceRule !== 'object') {
        throw new Error('Recurrence pattern is required and must be a valid JSON object');
    }

    const executionDates =getRecurrenceTaskDates(recurrenceRule, startDate, endDate);


    return await prisma.$transaction(async (tx) => {
        const rr = await tx.recurrenceRule.create(
            {
                data: {
                        recurrence_pattern : JSON.stringify(recurrenceRule),
                        end_date: endDate.toJSDate() ,
                        start_date: startDate.toJSDate()
                }
            })

        const tasks = [];
        for (const item of executionDates) {
            const task = await tx.task.create({
                data: {
                    pc_id:              pcId,
                    task_type_id:       taskTypeId,
                    recurrence_rule_id: rr.recurrence_rule_id,
                    task_description:   taskDescription,
                    execution_date:     DateTime.fromISO(item).toJSDate(),
                    start_time:         startTime.toJSDate(),
                    end_time:           endTime.toJSDate(),
                    is_recurring:       true,
                    is_completed:       false,
                }
            });
            tasks.push(task);
        }

        return { recurrenceRule: rr, tasks };
    });

}



const updateTask = async (data) => {
    const task_id = data.task_id;


    const existing_task = await prisma.task.findFirst({
        where: { task_id: task_id },
    });

    if (!existing_task) throw new Error('Task not exist');

    const pcId = existing_task.pc_id;
    const taskTypeId = data.task_type_id;
    const taskDescription = data.task_description;

    const startTime = DateTime.fromFormat(data.start_time, 'HH:mm:ss');
    const endTime   = DateTime.fromFormat(data.end_time,   'HH:mm:ss');


    if(existing_task.is_recurring) {
        const recurrenceRule = typeof data.recurrence_pattern === 'string'
            ? JSON.parse(data.recurrence_pattern)
            : data.recurrence_pattern;
        const startDate = DateTime.fromISO(data.start_date);
        const endDate   = DateTime.fromISO(data.end_date);


        await validateTaskVariables(pcId,taskTypeId,taskDescription,startTime,endTime);



        if (!data.start_date) throw new Error('Start date is required');
        if (!data.end_date)   throw new Error('End date is required');

        if (!startDate.isValid) throw new Error('Start date is not valid. Expected format: YYYY-MM-DD');
        if (!endDate.isValid)   throw new Error('End date is not valid. Expected format: YYYY-MM-DD');
        if (endDate <= startDate) throw new Error('End date must be later than start date');


        if (!recurrenceRule || typeof recurrenceRule !== 'object') {
            throw new Error('Recurrence pattern is required and must be a valid JSON object');
        }

        const executionDates =getRecurrenceTaskDates(recurrenceRule, startDate, endDate);


        return await prisma.$transaction(async (tx) => {


            await tx.task.deleteMany({
                where: {
                    recurrence_rule_id: existing_task.recurrence_rule_id,
                    is_completed: false
                }
            });


            const rr = await tx.recurrenceRule.update(
                {
                    where: {
                        recurrence_rule_id: existing_task.recurrence_rule_id
                    },
                    data: {
                        recurrence_pattern : JSON.stringify(recurrenceRule),
                        end_date: endDate.toJSDate() ,
                        start_date: startDate.toJSDate()
                    }
                })

            const tasks = [];
            for (const item of executionDates) {
                const task = await tx.task.create({
                    data: {
                        pc_id:              pcId,
                        task_type_id:       taskTypeId,
                        recurrence_rule_id: rr.recurrence_rule_id,
                        task_description:   taskDescription,
                        execution_date:     DateTime.fromISO(item).toJSDate(),
                        start_time:         startTime.toJSDate(),
                        end_time:           endTime.toJSDate(),
                        is_recurring:       true,
                        is_completed:       false,
                    }
                });
                tasks.push(task);
            }

            return { recurrenceRule: rr, tasks };
        });




    } else {
        if (!data.execution_date) throw new Error('Execution date is required');
        const executionDate = DateTime.fromISO(data.execution_date);


        await validateTaskVariables(pcId,taskTypeId,taskDescription,startTime,endTime);


        if (!executionDate.isValid) throw new Error('Execution date is not valid. Expected format: YYYY-MM-DD');


        const task = await prisma.task.update({
            where: {
                task_id : task_id
            },
            data: {
                task_type_id: taskTypeId,
                recurrence_rule_id: null,
                task_description: taskDescription,
                execution_date : executionDate.toJSDate(),
                start_time :  startTime.toJSDate(),
                end_time : endTime.toJSDate(),
                is_recurring : false,
                is_completed : false

            }
        });

        return task;


    }


}




const deleteTask = async (data) => {
    const task_id = data.task_id;


    const existing_task = await prisma.task.findFirst({
        where: { task_id: task_id },
    });

    if (!existing_task) throw new Error('Task not exist');


    if(existing_task.is_recurring) {


        return await prisma.$transaction(async (tx) => {

            const { count } = await tx.task.deleteMany({
                where: {
                    recurrence_rule_id: existing_task.recurrence_rule_id,
                    is_completed: false
                }
            });

            await tx.recurrenceRule.deleteMany({
                where: {
                    recurrence_rule_id: existing_task.recurrence_rule_id,
                    Task: {
                        none: {}
                    }
                }
            });

            return { deletedTasksCount: count };
        });



    } else {

        const task = await prisma.task.delete({
            where: {
                task_id : task_id
            }
        });

        return task;

    }
}

module.exports = { createTask, createRecurrenceTask,updateTask,deleteTask };
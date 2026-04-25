const prisma = require("../config/prismaClient.js");



async function validateTaskType(task_type_name,type_desc) {
    const existing_task_type = await prisma.taskType.findFirst({
        where: { task_type_name: task_type_name },
    });

    if (existing_task_type) throw new Error('Task type with this name already exist');

    if (typeof task_type_name !== 'string' || task_type_name.length <= 0 || task_type_name.length > 225) {
        throw new Error('Invalid task type name');
    }
    if (typeof type_desc !== 'string' || type_desc.length <= 0 || type_desc.length > 225) {
        throw new Error('Invalid task type description');
    }
}

const createTaskType = async (data) => {

    const task_type_name   = data.task_type_name;
    const type_desc = data.type_desc;


    validateTaskType(task_type_name,type_desc);



    const task_type = await prisma.taskType.create({
        data: {
            task_type_name: task_type_name,
            type_desc: type_desc
        }
    });

    return task_type;

}


const updateTaskType = async (data) => {

    const taskTypeId   = data.task_type_id;
    const task_type_name   = data.task_type_name;
    const type_desc = data.type_desc;


    const existing_task_type = await prisma.taskType.findFirst({
        where: { task_type_id: taskTypeId },
    });

    if (!existing_task_type) throw new Error('Task type not exist');

    validateTaskType(task_type_name,type_desc);


    const updatedTaskType = await prisma.taskType.update({
        where: { task_type_id: taskTypeId },
        data: {
            task_type_name: task_type_name,
            type_desc: type_desc
        }
    });

    return updatedTaskType;

}


const deleteTaskType = async (data) => {

    const taskTypeId   = data.task_type_id;



    const existing_task_type = await prisma.taskType.findFirst({
        where: { task_type_id: taskTypeId }
    });

    if (!existing_task_type) throw new Error('Task type not exist');

    const used = await prisma.task.count({
        where: {
            task_type_id: taskTypeId
        }
    })

    if (used > 0) {
        throw new Error("Record is used as foreign key")
    }

    const deleteTaskType = await prisma.taskType.delete({
        where: { task_type_id: taskTypeId },
    });


    return deleteTaskType;

}




const getAllTaskTypes = async () => {
    const taskTypes = await prisma.taskType.findMany({
        select: {
            task_type_id: true,
            task_type_name: true,
        },
    });

    return taskTypes;
};


module.exports = { createTaskType,updateTaskType,deleteTaskType,getAllTaskTypes };
const { createTask, createRecurrenceTask , updateTask,deleteTask ,completeTask} = require("../services/taskService.js");
const { successResponse, errorResponse} = require('../models/response');



async function createTaskEntity(req, res) {
    try {

        const pc = await createTask(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

async function createRecurrenceTaskEntity(req, res) {
    try {

        const pc = await createRecurrenceTask(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}



async function updateTaskEntity(req, res) {
    try {

        const pc = await updateTask(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}




async function deleteTaskTaskEntity(req, res) {
    try {

        const pc = await deleteTask(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'DELETE_ERROR'));
    }

}
async function finishTask(req, res) {
    try {

        const pc = await completeTask(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'COMPLETE_ERROR'));
    }

}




module.exports = { createTaskEntity,createRecurrenceTaskEntity,updateTaskEntity,deleteTaskTaskEntity,finishTask};
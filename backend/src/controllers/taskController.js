const { createTask, createRecurrenceTask } = require("../services/taskService.js");
const { successResponse, errorResponse } = require('../models/response');



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




module.exports = { createTaskEntity,createRecurrenceTaskEntity};
const  { createTaskType,updateTaskType,deleteTaskType }  = require("../services/taskTypeService.js");
const { successResponse, errorResponse } = require('../models/response');



async function createTaskTypeEntity(req, res) {
    try {

        const pc = await createTaskType(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

async function updateTaskTypeEntity(req, res) {
    try {

        const pc = await updateTaskType(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}

async function deleteTaskTypeEntity(req, res) {
    try {

        const pc = await deleteTaskType(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'DELETE_ERROR'));
    }

}

module.exports = { createTaskTypeEntity,updateTaskTypeEntity,deleteTaskTypeEntity };
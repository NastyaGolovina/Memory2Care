const  { createTaskType,updateTaskType,deleteTaskType,getAllTaskTypes }  = require("../services/taskTypeService.js");
const { successResponse, errorResponse } = require('../models/response');



async function createTaskTypeEntity(req, res) {
    try {

        const tt = await createTaskType(req.body)
        res.status(200).json(successResponse(tt));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

async function updateTaskTypeEntity(req, res) {
    try {

        const tt = await updateTaskType(req.body)
        res.status(200).json(successResponse(tt));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}

async function deleteTaskTypeEntity(req, res) {
    try {

        const tt = await deleteTaskType(req.body)
        res.status(200).json(successResponse(tt));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'DELETE_ERROR'));
    }

}


async function getAllTaskTypesEntity(req, res) {
    try {

        const p = await getAllTaskTypes(req.query)
        res.status(200).json(successResponse(p));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}

module.exports = { createTaskTypeEntity,updateTaskTypeEntity,deleteTaskTypeEntity,getAllTaskTypesEntity };
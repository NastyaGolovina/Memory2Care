const { createTask,
    createRecurrenceTask ,
    updateTask,
    deleteTask ,
    completeTask,
    getTask,
    getTaskByPCDate,
    getTaskByPC,
    getTaskByCaregiver,
    getTaskByCaregiverByDate,
    getTaskCompletionByCaregiverByDate,
    getTaskCompletionByPCDate} = require("../services/taskService.js");
const { successResponse, errorResponse} = require('../models/response');
const {getAllPatientsForCaregiver} = require("../services/caregiverService");



async function createTaskEntity(req, res) {
    try {

        const t = await createTask(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

async function createRecurrenceTaskEntity(req, res) {
    try {

        const t = await createRecurrenceTask(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}



async function updateTaskEntity(req, res) {
    try {

        const t = await updateTask(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}




async function deleteTaskTaskEntity(req, res) {
    try {

        const t = await deleteTask(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'DELETE_ERROR'));
    }

}
async function finishTask(req, res) {
    try {

        const t = await completeTask(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'COMPLETE_ERROR'));
    }

}

async function getTaskByID(req, res) {
    try {

        const t = await getTask(req.query)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}


async function getTaskByPatientCaregiverDate(req, res) {
    try {

        const t = await getTaskByPCDate(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}

async function getTasksByCaregiverByDate(req, res) {
    try {

        const t = await getTaskByCaregiverByDate(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}


async function getTaskByPatientCaregiver(req, res) {
    try {

        const t = await getTaskByPC(req.query)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}


async function getTasksByCaregiver(req, res) {
    try {

        const t = await getTaskByCaregiver(req.query)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}
async function getNumOfTaskCompletionByCaregiverByDate(req, res) {
    try {

        const t = await getTaskCompletionByCaregiverByDate(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}
async function getNumTaskCompletionByPCDate(req, res) {
    try {

        const t = await getTaskCompletionByPCDate(req.body)
        res.status(200).json(successResponse(t));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}



module.exports = { createTaskEntity,
    createRecurrenceTaskEntity,
    updateTaskEntity,
    deleteTaskTaskEntity,
    finishTask,
    getTaskByID,
    getTaskByPatientCaregiverDate,
    getTaskByPatientCaregiver,
    getTasksByCaregiver,
    getTasksByCaregiverByDate,
    getNumOfTaskCompletionByCaregiverByDate,
    getNumTaskCompletionByPCDate};
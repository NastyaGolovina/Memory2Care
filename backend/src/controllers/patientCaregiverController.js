const { createPatientCaregiver,updatePatientCaregiver} = require("../services/patientCaregiverService.js");
const { successResponse, errorResponse } = require('../models/response');



async function createPatientCaregiverEntity(req, res) {
    try {

        const pc = await createPatientCaregiver(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

async function updatePatientCaregiverEntity(req, res) {
    try {

        const pc = await updatePatientCaregiver(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}

module.exports = { createPatientCaregiverEntity,updatePatientCaregiverEntity };
const { createPatientCaregiver} = require("../services/patientCaregiverService.js");
const { successResponse, errorResponse } = require('../models/response');



async function createPatientCaregiverEntity(req, res) {
    try {

        const pc = await createPatientCaregiver(req.body)
        res.status(200).json(successResponse(pc));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

module.exports = { createPatientCaregiverEntity };
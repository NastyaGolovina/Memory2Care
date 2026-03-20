const { deactivatePatient, searchPatient } = require("../services/patientServise.js");
const prisma = require('../config/prismaClient');
const { successResponse, errorResponse } = require('../models/response');



async function deactivatePatientEntity(req, res) {
    try {

        const p = await deactivatePatient(req.body)
        res.status(200).json(successResponse({
            user: {
                user_id: p.user_id,
                active: p.active
            }
        }));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'DEACTIVATE_ERROR'));
    }

}


async function findPatient(req, res) {
    try {

        const p = await searchPatient(req.body)
        res.status(200).json(successResponse(p));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'FIND_PATIENT_ERROR'));
    }

}





module.exports = {deactivatePatientEntity, findPatient};
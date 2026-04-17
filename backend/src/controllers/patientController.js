const { deactivatePatient, searchPatient ,updatePatient,getPatientProfileById } = require("../services/patientServise.js");
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


async function updatePatientEntity(req, res) {
    try {

        const p = await updatePatient(req.body)
        res.status(200).json(successResponse(p));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}

async function getPatientProfileByPatientId(req, res) {
    try {

        const p = await getPatientProfileById(req.query)
        res.status(200).json(successResponse(p));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}



module.exports = {deactivatePatientEntity, findPatient, updatePatientEntity, getPatientProfileByPatientId};
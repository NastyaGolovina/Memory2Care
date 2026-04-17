const { approveCaregiver ,getAllPatientsForCaregiver,updateCaregiver} = require("../services/caregiverService");
const {successResponse, errorResponse} = require("../models/response");

async function approveCaregiverEntity(req, res) {
    try {
        // if (req.user.role !== 'ADMIN') {
        //     return res.status(403).json(errorResponse('Access denied', 'FORBIDDEN'));
        // }

        const c = await   approveCaregiver(req.body)
        res.status(200).json(successResponse({
            user: {
                user_id: c.user_id,
                approved: c.approved,
                approved_date_time:  c.approved_date_time,
            }
        }));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'APPROVE_ERROR'));
    }

}

async function updatedCaregiverEntity(req, res) {
    try {

        const c = await updateCaregiver(req.body)
        res.status(200).json(successResponse(c));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}

async function getPatientsByCaregiver(req, res) {
    try {

        const patientCaregiver = await getAllPatientsForCaregiver(req.query)
        res.status(200).json(successResponse(patientCaregiver));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}


module.exports = { approveCaregiverEntity,getPatientsByCaregiver,updatedCaregiverEntity };
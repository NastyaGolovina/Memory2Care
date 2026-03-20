const { deactivatePatient } = require("../services/patientServise.js");
const prisma = require('../config/prismaClient');
const { successResponse, errorResponse } = require('../models/response');
const {approveCaregiver} = require("../services/userService");


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



module.exports = {deactivatePatientEntity};
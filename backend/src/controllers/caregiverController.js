const { approveCaregiver } = require("../services/caregiverService");
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


module.exports = { approveCaregiverEntity };
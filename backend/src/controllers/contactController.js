const { sendContactEmail } = require('../services/emailService');
const { successResponse, errorResponse } = require('../models/response');

async function sendContact(req, res) {
    try {
        await sendContactEmail(req.body);
        res.status(200).json(successResponse({ sent: true }));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'SEND_EMAIL_ERROR'));
    }
}

module.exports = { sendContact };
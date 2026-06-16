const { sendResetCode, resetPassword } = require('../services/resetService');
const { successResponse, errorResponse } = require('../models/response');

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(errorResponse('Email is required', 'VALIDATION_ERROR'));
        }
        await sendResetCode(email);
        res.status(200).json(successResponse({ message: 'If this email is registered, a code will be sent.' }));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'RESET_ERROR'));
    }
}

async function resetPasswordController(req, res) {
    try {
        const { email, code, newPassword } = req.body;
        if (!email || !code || !newPassword) {
            return res.status(400).json(errorResponse('email, code and newPassword are required', 'VALIDATION_ERROR'));
        }
        if (newPassword.length < 6) {
            return res.status(400).json(errorResponse('Password must be at least 6 characters', 'VALIDATION_ERROR'));
        }
        await resetPassword(email, code, newPassword);
        res.status(200).json(successResponse({ message: 'Password updated successfully.' }));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'RESET_ERROR'));
    }
}

module.exports = { forgotPassword, resetPasswordController };
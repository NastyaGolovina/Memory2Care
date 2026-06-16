const prisma = require("../config/prismaClient.js");
const { hashPassword } = require('../services/cryptoService');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const resetCodes = new Map();
const CODE_TTL_MS = 10 * 60 * 1000;

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendResetCode = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('If this email is registered, a code will be sent.');
    }

    const code = generateCode();
    resetCodes.set(email, {
        code,
        expiresAt: Date.now() + CODE_TTL_MS,
    });

    await resend.emails.send({
        from: 'Memory2Care <onboarding@resend.dev>',
        to: email,
        subject: '[Memory2Care] Password reset code',
        html: `
            <h2>Password Reset</h2>
            <p>Your verification code is:</p>
            <h1 style="letter-spacing: 8px; font-size: 40px;">${code}</h1>
            <p>This code is valid for <b>10 minutes</b>.</p>
            <p>If you did not request this, please ignore this email.</p>
        `,
    });
};

const resetPassword = async (email, code, newPassword) => {
    const entry = resetCodes.get(email);

    if (!entry) {
        throw new Error('No reset code was requested for this email.');
    }
    if (Date.now() > entry.expiresAt) {
        resetCodes.delete(email);
        throw new Error('The code has expired. Please request a new one.');
    }
    if (entry.code !== code) {
        throw new Error('Invalid code.');
    }

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
        where: { email },
        data: { password: hashed },
    });

    resetCodes.delete(email);
};

module.exports = { sendResetCode, resetPassword };
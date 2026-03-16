const { createUser, loginUser } = require("../services/userService.js");
const { generateAccessToken, generateRefreshToken } = require('../services/cryptoService');
const prisma = require('../config/prismaClient');


async function signup(req, res) {
    try {
        const user = await createUser(req.body)
        if(user.role === 'CAREGIVER') {
            return res.status(201).json({
                message: 'Account created, please wait for confirmation'
            });
        }
        const accessToken  = generateAccessToken(user.user_id, user.role);
        const refreshToken = generateRefreshToken(user.user_id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ accessToken });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}



async function login(req, res) {
    try {
        const user = await loginUser(req.body)

        const accessToken  = generateAccessToken(user.user_id, user.role);
        const refreshToken = generateRefreshToken(user.user_id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            user: {
                user_id:           user.user_id,
                email:             user.email,
                role:              user.role,
                profile:           user.profile
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}


async function refresh(req, res) {
    const token = req.cookies.refreshToken; // берём из cookie
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    try {
        const { verifyRefreshToken, generateAccessToken } = require('../services/cryptoService');
        const decoded = verifyRefreshToken(token);


        const user = await prisma.user.findUnique({ where: { user_id: decoded.user_id } });
        if (!user) return res.status(401).json({ error: 'user not found' });

        const newAccessToken = generateAccessToken(user.user_id, user.role);
        res.json({ accessToken: newAccessToken });
    } catch (err) {

        res.status(403).json({ error: 'Session expired, please log in again' });
    }
}

async function logout(req, res) {

    res.clearCookie('refreshToken');
    res.json({ message: 'Exited successfully' });
}

module.exports = { signup, login, refresh, logout };

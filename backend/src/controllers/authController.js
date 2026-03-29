// const { createUser, loginUser, approveCaregiver } = require("../services/userService.js");
const { createUser, loginUser, writeLog } = require("../services/userService.js");
const { generateAccessToken, generateRefreshToken } = require('../services/cryptoService');
const prisma = require('../config/prismaClient');
const { successResponse, errorResponse } = require('../models/response');


async function signup(req, res) {
    try {
        const user = await createUser(req.body)
        if(user.role === 'CAREGIVER') {
            return res.status(201).json(successResponse({
                message: 'Account created, please wait for confirmation'
            }));
        }
        const accessToken  = generateAccessToken(user.user_id, user.role);
        const refreshToken = generateRefreshToken(user.user_id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json(successResponse({ accessToken,
        user : {
            user_id: user.user_id,
            email:   user.email,
            role:    user.role
        }}));

    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'SIGNUP_ERROR'));
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

        let successMsg =  successResponse({
            accessToken,
            user: {
                user_id: user.user_id,
                email:   user.email,
                role:    user.role,
                profile: user.profile
            }
        })

        // await writeLog(user.email,JSON.stringify(successMsg));
        await writeLog(user.email,'Login successful');
        res.status(200).json(successMsg);

    } catch (err) {
        const login = req.body.email ?? 'unknown';
        let errorMsg = errorResponse(err.message, 'LOGIN_ERROR')
        // await writeLog(login.email,JSON.stringify(errorMsg))
        await writeLog(login,`Login failed: ${err.message}`)
        res.status(400).json(errorMsg);
        // res.status(400).json(errorResponse(err.message, 'LOGIN_ERROR'));
    }
}


async function refresh(req, res) {
    const token = req.cookies.refreshToken; // берём из cookie
    if (!token) return res.status(401).json(errorResponse('No refresh token', 'NO_REFRESH_TOKEN'));


    try {
        const { verifyRefreshToken, generateAccessToken } = require('../services/cryptoService');
        const decoded = verifyRefreshToken(token);


        const user = await prisma.user.findUnique({ where: { user_id: decoded.user_id } });
        if (!user) return res.status(401).json(errorResponse('User not found', 'USER_NOT_FOUND'));

        const newAccessToken = generateAccessToken(user.user_id, user.role);

        res.status(200).json(successResponse({ accessToken: newAccessToken }));

    } catch (err) {
        res.status(403).json(errorResponse('Session expired, please log in again', 'SESSION_EXPIRED'));
    }
}

async function logout(req, res) {

    res.clearCookie('refreshToken');
    res.status(200).json(successResponse({ message: 'Exited successfully' }));
}

// async function approveCaregiverEntity(req, res) {
//     try {
//         // if (req.user.role !== 'ADMIN') {
//         //     return res.status(403).json(errorResponse('Access denied', 'FORBIDDEN'));
//         // }
//
//         const c = await   approveCaregiver(req.body)
//         res.status(200).json(successResponse({
//             user: {
//                 user_id: c.user_id,
//                 approved: c.approved,
//                 approved_date_time:  c.approved_date_time,
//             }
//         }));
//     } catch (err) {
//         res.status(400).json(errorResponse(err.message, 'APPROVE_ERROR'));
//     }
//
// }


// module.exports = { signup, login, refresh, logout,approveCaregiverEntity };
module.exports = { signup, login, refresh, logout };

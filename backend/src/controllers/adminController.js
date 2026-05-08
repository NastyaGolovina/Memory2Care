const {getUsers, getStats,getLogsCountByPeriod,getLogs} = require("../services/adminService");
const {successResponse, errorResponse} = require("../models/response");


async function getAllUsers(req, res) {
    try {

        const u = await getUsers()
        res.status(200).json(successResponse(u));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}

async function getAdminStats(req, res) {
    try {

        const u = await getStats()
        res.status(200).json(successResponse(u));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}

async function getLogsCountByPeriodOfTime(req, res) {
    try {

        const l = await getLogsCountByPeriod(req.body)
        res.status(200).json(successResponse(l));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}
async function getLogsPage(req, res) {
    try {

        const l = await getLogs(req.body)
        res.status(200).json(successResponse(l));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}




module.exports = { getAllUsers,getAdminStats,getLogsCountByPeriodOfTime ,getLogsPage};
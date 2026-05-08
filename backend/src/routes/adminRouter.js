const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {getAllUsers,getAdminStats,getLogsCountByPeriodOfTime,getLogsPage} = require("../controllers/adminController");


const router = express.Router();


router.get('/get/users', authenticate,  getAllUsers);
router.get('/get/stats', authenticate,  getAdminStats);
router.post('/get/log/in-period', authenticate,  getLogsCountByPeriodOfTime);
router.post('/get/logs', authenticate,  getLogsPage);
module.exports = router;
const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {getAllUsers,getAdminStats,getLogsCountByPeriodOfTime} = require("../controllers/adminController");


const router = express.Router();


router.get('/get/users', authenticate,  getAllUsers);
router.get('/get/stats', authenticate,  getAdminStats);
router.post('/get/log/in-period', authenticate,  getLogsCountByPeriodOfTime);
module.exports = router;
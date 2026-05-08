const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {getAllUsers,getAdminStats} = require("../controllers/adminController");


const router = express.Router();


router.get('/get/users', authenticate,  getAllUsers);
router.get('/get/stats', authenticate,  getAdminStats);
module.exports = router;
const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {approveCaregiverEntity} = require("../controllers/caregiverController");


const router = express.Router();


router.post('/approve', authenticate,  approveCaregiverEntity);

module.exports = router;
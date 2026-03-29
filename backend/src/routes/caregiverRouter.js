const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {approveCaregiverEntity,getPatientsByCaregiver} = require("../controllers/caregiverController");


const router = express.Router();


router.post('/approve', authenticate,  approveCaregiverEntity);
router.get('/get/patients', authenticate,  getPatientsByCaregiver);

module.exports = router;
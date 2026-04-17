const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {approveCaregiverEntity,getPatientsByCaregiver,updatedCaregiverEntity,getCaregiverProfileByCaregiverId} = require("../controllers/caregiverController");


const router = express.Router();


router.post('/approve', authenticate,  approveCaregiverEntity);
router.get('/get/patients', authenticate,  getPatientsByCaregiver);
router.get('/get/caregiver', authenticate,  getCaregiverProfileByCaregiverId);
router.post('/update', authenticate,  updatedCaregiverEntity);

module.exports = router;
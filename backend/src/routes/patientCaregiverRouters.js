const express = require('express');
const router = express.Router();
const { createPatientCaregiverEntity,updatePatientCaregiverEntity} = require('../controllers/patientCaregiverController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createPatientCaregiverEntity);
router.post('/update', authenticate,  updatePatientCaregiverEntity);

module.exports = router;
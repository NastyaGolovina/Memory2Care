const express = require('express');
const router = express.Router();
const { createPatientCaregiverEntity,updatePatientCaregiverEntity,deactivatePatientCaregiverEntity,getPatientProfileByPatientCaregiverId} = require('../controllers/patientCaregiverController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createPatientCaregiverEntity);
router.post('/update', authenticate,  updatePatientCaregiverEntity);
router.post('/deactivate', authenticate,  deactivatePatientCaregiverEntity);
router.get('/get', authenticate,  getPatientProfileByPatientCaregiverId);

module.exports = router;
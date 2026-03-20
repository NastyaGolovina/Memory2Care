const express = require('express');
const router = express.Router();
const { createPatientCaregiverEntity} = require('../controllers/patientCaregiverController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createPatientCaregiverEntity);

module.exports = router;
const express = require('express');
const router = express.Router();
const { deactivatePatientEntity } = require('../controllers/patientController');
const { authenticate } = require('../middleware/authMiddleware');
const {approveCaregiverEntity} = require("../controllers/authController");




router.post('/deactivate', authenticate,  deactivatePatientEntity);

module.exports = router;
const express = require('express');
const router = express.Router();
const { deactivatePatientEntity, findPatient} = require('../controllers/patientController');
const { authenticate } = require('../middleware/authMiddleware');
const {approveCaregiverEntity} = require("../controllers/authController");




router.post('/deactivate', authenticate,  deactivatePatientEntity);
router.post('/find', authenticate,  findPatient);

module.exports = router;
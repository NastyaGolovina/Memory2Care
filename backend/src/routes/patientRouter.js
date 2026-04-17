const express = require('express');
const router = express.Router();
const { deactivatePatientEntity, findPatient,updatePatientEntity, getPatientProfileByPatientId} = require('../controllers/patientController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/deactivate', authenticate,  deactivatePatientEntity);
router.post('/find', authenticate,  findPatient);
router.post('/update', authenticate,  updatePatientEntity);
router.get('/get/patient', authenticate,  getPatientProfileByPatientId);

module.exports = router;
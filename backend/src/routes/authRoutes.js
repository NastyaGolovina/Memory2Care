const express = require('express');
const router = express.Router();
const { signup, login, refresh, logout,approveCaregiverEntity } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');


router.post('/signup',  signup);
router.post('/login',   login);
router.post('/refresh', refresh);
router.post('/logout',  logout);
router.post('/approve/caregiver', authenticate,  approveCaregiverEntity);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createTaskEntity,
    createRecurrenceTaskEntity,
    updateTaskEntity,
    deleteTaskTaskEntity,
    finishTask,
    getTaskByID,
    getTaskByPatientCaregiverDate,
    getTaskByPatientCaregiver,
    getTasksByCaregiver,
    getTasksByCaregiverByDate} = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createTaskEntity);
router.post('/create/recurrence', authenticate,  createRecurrenceTaskEntity);
router.post('/update', authenticate,  updateTaskEntity);
router.post('/delete', authenticate,  deleteTaskTaskEntity);
router.post('/complete', authenticate,  finishTask);
router.get('/get/id', authenticate,  getTaskByID);
router.post('/get/pc-date', authenticate,  getTaskByPatientCaregiverDate);
router.get('/get/pc', authenticate,  getTaskByPatientCaregiver);
router.get('/get/caregiver', authenticate,  getTasksByCaregiver);
router.post('/get/caregiver-date', authenticate,  getTasksByCaregiverByDate);


module.exports = router;
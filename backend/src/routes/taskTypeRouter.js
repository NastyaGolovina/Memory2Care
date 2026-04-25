const express = require('express');
const router = express.Router();
const { createTaskTypeEntity,updateTaskTypeEntity,deleteTaskTypeEntity,getAllTaskTypesEntity} = require('../controllers/taskTypeController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createTaskTypeEntity);
router.post('/update', authenticate,  updateTaskTypeEntity);
router.post('/delete', authenticate,  deleteTaskTypeEntity);
router.get('/get/all', authenticate,  getAllTaskTypesEntity);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createTaskEntity,createRecurrenceTaskEntity,updateTaskEntity,deleteTaskTaskEntity} = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createTaskEntity);
router.post('/create/recurrence', authenticate,  createRecurrenceTaskEntity);
router.post('/update', authenticate,  updateTaskEntity);
router.post('/delete', authenticate,  deleteTaskTaskEntity);


module.exports = router;
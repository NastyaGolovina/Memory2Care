const express = require('express');
const router = express.Router();
const { createTaskEntity,createRecurrenceTaskEntity,updateTaskEntity,deleteTaskTaskEntity,finishTask} = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createTaskEntity);
router.post('/create/recurrence', authenticate,  createRecurrenceTaskEntity);
router.post('/update', authenticate,  updateTaskEntity);
router.post('/delete', authenticate,  deleteTaskTaskEntity);
router.post('/complete', authenticate,  finishTask);


module.exports = router;
const express = require('express');
const router = express.Router();
const {createRecurrenceTaskEntity,createTaskEntity} = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');





router.post('/create', authenticate,  createTaskEntity);
router.post('/create/recurrence', authenticate,  createRecurrenceTaskEntity);


module.exports = router;
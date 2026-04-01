const express = require('express');
const router = express.Router();
const { createPageContent,updatePageContent,getPageContent} = require('../controllers/pageController');





router.post('/create',  createPageContent);
router.post('/update',  updatePageContent);
router.get('/get',  getPageContent);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createPageContent,updatePageContent,getPageContent,newsList,newsItem} = require('../controllers/pageController');





router.post('/create',  createPageContent);
router.post('/update',  updatePageContent);
router.get('/get',  getPageContent);
router.get('/list', newsList);
router.get('/item', newsItem);

module.exports = router;
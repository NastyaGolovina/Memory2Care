const express = require('express');
const {authenticate} = require("../middleware/authMiddleware");
const {getAllUsers} = require("../controllers/adminController");


const router = express.Router();


router.get('/get/users', authenticate,  getAllUsers);
module.exports = router;
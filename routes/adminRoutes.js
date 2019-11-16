const express = require('express');
const validator = require('validator')

// const { pool } = require('../config')
const router = express.Router();
const adminRoute = require('../controllers/admin');
const auth = require('../middleware/auth')



//Admin Can create Account

router.post("/auth/create-user", adminRoute.createNewUser);


router.post('/signin', adminRoute.createLogin)

module.exports = router;

const express = require('express');

// const { pool } = require('../config')
const router = express.Router();
const adminRoute = require('../controllers/admin');
const { userValidationRules, validate } = require('../middleware/validation');


//Admin Can create Account

router.post("/auth/create-user", userValidationRules, validate, adminRoute.createNewUser);


router.post('/signin', adminRoute.createLogin)

module.exports = router;
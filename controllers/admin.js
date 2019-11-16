const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator')
require('dotenv').config()

const AdminService = require('../service/AdminService');
const Util = require('../utils/Utils');

const util = new Util()

exports.createNewUser = async (req, res) => {
    const userValidationRules = [
        check(req.body.firstname).isLength({ min: 3 }),
        check(req.body.lastname).isLength({ min: 3 }),
        check(req.body.email).isEmail(),
        check(req.body.hash).isLength({ min: 8 }),
        check(req.body.address).isLength({ min: 10 }),
        check(req.body.gender).isIn(['Male', 'Female']),
        check(req.body.jobrole).isLength({ min: 2 }),
        check(req.body.department).isLength({ min: 6 })
    ]
    const errors = validationResult(userValidationRules);
    if (!errors.isEmpty()) {
        util.setError(422, errors.msg);
        return util.send(res);
    }
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const newEmployee = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        jobrole: req.body.jobrole,
        department: req.body.email,
        address: req.body.address
    };
    try {
        const result = await AdminService.createEmployee(newEmployee);
        util.setSuccess(201, {
            message: 'User account successfully created',
            token: req.headers.authorization,
            userId: result.rows[0].id
        });

        return util.send(res);
    } catch (error) {
        util.setError(500, error.message);
        return util.send(res);
    }
};




const validator = require('validator')
const { check, validationResult } = require('express-validator');

// const userValidationRules = () => {
//     [
//         check(req.body.firstname).isLength({ min: 3 }),
//         check(req.body.lastname).isLength({ min: 3 }),
//         check(req.body.email).isEmail(),
//         check(req.body.password).isLength({ min: 8 }),
//         check(req.body.address).isLength({ min: 10 }),
//         check(req.body.gender).isIn(['Male', 'Female']),
//         check(req.body.jobrole).isLength({ min: 2 }),
//         check(req.body.department).isLength({ min: 6 })
//     ]

// }

// const validate = (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() })
//     }
//     const firstname = req.body.firstname;
//     const lastname = req.body.last


// module.exports = {
//     userValidationRules,
//     // validate
// }
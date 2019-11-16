

const jwt = require('jsonwebtoken');
require('dotenv').config();

const AdminService = require('../service/AdminService');
const Util = require('../utils/Utils');

const util = new Util();



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'TEAMWORK_RESTAPI_PROJECT_WITH_NODEJS');
        const userId = decodedToken.userId;

        if (req.body.id && req.body.id !== userId) {
            res.status(403).json({
                error: "Token is not provided"
            })
        } else {
            next();
        }
    } catch{
        res.status(401).json({
            error: "Invalid Request"
        })
    }
}
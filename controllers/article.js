const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { pool } = require('../config')
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "samspecial",
    host: "localhost",
    database: "employees",
    password: "password",
    port: 5432,
});


const createNewUser = (req, res) => {

    bcrypt.hash(req.body.password, 10).then(hash => {
        const { lastname, email, password, firstname, jobrole, address, gender, department } = req.body;
        const createdon = new Date();
        if (!lastname || !email || !password || !firstname || !jobrole || !address || !gender || !department) {
            return res.status(404).json({
                status: "Error",
                error: "Fields cannot be empty"
            })
        }
        pool.query('INSERT INTO users (lastname, firstname, address, jobrole, gender, email, department, createdon, hash) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9)',
            [lastname, firstname, address, jobrole, gender, email, department, createdon, hash], (error, results) => {
                if (error) {
                    res.status(401).json({
                        status: "Error",
                        error: "Account creation not successful"
                    })
                }
                res.status(201).json({
                    status: "Success",
                    data: {
                        message: "Account Successfully Created",
                        token: "token",
                        userId: `${results.id}`
                    }
                })
            })
    }).catch(error => {
        error: new Error;
    })
}

const createLogin = (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT hash FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(401).json({
                status: "Error",
                message: "Error getting user"
            })
        }
        console.log(results.rows[0].hash)
        bcrypt.compare(password, results.rows[0].hash).then(valid => {
            if (valid) {

                return pool.query('SELECT * FROM users', (error, results) => {
                    const token = jwt.sign({ userId: results.rows[0].id },
                        'TEAMWORK_RESTAPI_PROJECT_WITH_NODEJS',
                        { expiresIn: '6h' }
                    )

                    console.log(token)
                    res.status(200).json({
                        status: "Signin Successful",
                        data: {
                            token: token,
                            userId: results.rows[0].id
                        }
                    })
                })

            } else {
                res.status(404).json({
                    status: "Error",
                    message: "Password Mismatch"
                })
            }
        }).catch(err => {
            res.status(500).json({
                status: "Error",
                message: "Wrong Credentials"
            })
        })


    })
}



const newArticle = (req, res) => {
    const { title, article } = req.body;
    const createdon = new Date();
    pool.query('INSERT INTO articles (title, article, createdon) VALUES ($1,$2, $3)', [title, article, createdon], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        res.status(201).json({
            status: "Success",
            data: {
                message: "Article Successfully Created",
                title: `${title}`,
                article: `${article}`,

            }
        })
    })
}

const updateArticle = (req, res) => {
    const articleid = parseInt(req.params.articleid);
    const { article, title } = req.body;

    pool.query('UPDATE articles SET title = $1, article = $2 WHERE articleid = $3',
        [title, article, articleid], (error, results) => {
            if (error) {
                res.status(401).json({
                    status: "failed",
                    error: "Bad request"
                })
            }
            res.status(201).json({
                status: "Success",
                data: {
                    message: "Article Successfully Updated",
                    title: `${title}`,
                    article: `${article}`
                }
            })
        })
}

const deleteArticle = (req, res) => {
    const articleid = parseInt(req.params.articleid);

    pool.query('DELETE FROM articles WHERE articleid = $1', [articleid], (error, results) => {
        if (error) {
            res.status(403).json({
                status: error,
                message: "Unauthorized"
            })
        }
        res.status(200).json({
            status: "Success",
            data: {
                message: "Article Successsfully Deleted"
            }
        })
    })
}

const getArticle = (req, res) => {
    pool.query('SELECT * FROM articles ORDER BY createdon ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({
            status: "Success",
            data: results.rows
        })


    }
    )
}

const commentArticle = (req, res) => {
    const articleid = parseInt(req.params.articleid);
    const { comment } = req.body;
    const createdon = new Date()

    pool.query('INSERT INTO comments comment = $1, createdon = $2 WHERE articleid = $3', [comment, createdon, articleid], (error, results) => {
        if (error) {
            res.status(401).json({
                status: "error",
                message: "Comment Unsuccssful"
            })
        }
        res.status(201).json({
            status: "Success",
            data: {
                message: "Comment Successfully Created",
                createdOn: new Date(),
                articleTitle: "",
                article: "",
                comment: comment
            }
        })
    })

}

const getAllArticle = (req, res) => {
    const articleid = parseInt(req.params.articleid);
    const { comment } = req.body;
    const createdon = new Date()

    pool.query('SELECT * FROM comments WHERE articleid = $1', [articleid], (error, results) => {
        if (error) {
            res.status(401).json({
                status: "error",
                message: "Comment Unsuccssful"
            })
        }
        res.status(201).json({
            status: "Success",
            data: {
                id: "",
                createOn: new Date(),
                title: results.rows[0].title,
                message: "Comment Successfully Created",
                createdOn: new Date(),
                articleTitle: "",
                article: "",
                comment: comment
            }
        })
    })

}



// const editArticle = (req, res) = {

// }
module.exports = {
    createNewArticle: newArticle,
    getNewArticle: getArticle,
    createNewUser,
    createLogin,
    updateArticle,
    deleteArticle,
    commentArticle,
    getAllArticle
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const helmet = require('helmet');
const compression = require('compression');
// const expressValidator = require('validator');
const app = express();


const adminRoutes = require('./routes/adminRoutes');
// const auth = require('./middleware/auth');


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator())

app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// })

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

// app.get('/api/v1/', (req, res) => {
//     res.status(200).json({ "Info": "Node.js, Express and Postgres" })
// })

// app.post('/api/v1/articles', auth, db.createNewArticle);
// app.get('/api/v1/feed', db.getNewArticle);

app.use('/api/v1', adminRoutes);


// app.post('/signin', db.createLogin);

// app.patch('/articles/:articleid', auth, db.updateArticle);

// app.delete('/articles/:articleid', db.deleteArticle);

module.exports = app
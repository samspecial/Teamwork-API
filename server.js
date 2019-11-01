const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const createNewArticle = require('./controllers/articles/article');


const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ "Info": "Node.js, Express and Postgres" })
})

app.post('/articles', createNewArticle.createArticle);

app.listen(port, () => {
    console.log(`Connection Successful: Running on port ${port}.`)
});

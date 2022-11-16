const express = require('express');
const api = require('./api');
let taskList = require('./api/todos')
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 4001;

app.set('view engine', 'ejs');
app.use("/static", express.static('public'));

app.get('/', (req, res) => {
    res.render("index", { taskList});
})

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`listening to at http://localhost:${PORT}` )
})
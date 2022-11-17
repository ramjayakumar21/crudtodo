const express = require('express');
const api = require('./api');
const login = require('./api/login.js');
const session = require('express-session');
let taskList = require('./api/todos')
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 4001;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
    loggedin: false,
    pfilter: "ALL"
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use("/static", express.static('public'));

app.get('/', (req, res) => {
    let loggedin = req.session.loggedin
    if (loggedin == null || loggedin == false) {
        res.redirect("/login")
    } else {
        //console.log(req.session.pfilter)
        res.render('index', {taskList, username: req.session.username, pfilter: req.session.pfilter})
    }
})

app.use('/api', api);
app.use('/login', login);

app.listen(PORT, () => {
    console.log(`listening to at http://localhost:${PORT}` )
})
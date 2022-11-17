const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
let taskList = require('./todos')

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Sriram2003',
	database : 'nodelogin'
});

router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
                console.log(`signed into user ${username}`)
                res.redirect("/")
			} else {
				res.send('Incorrect Username and/or Password, please go back and try again!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}

  });


module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const session = require('express-session');

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
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', 
            [username, password], (err, results, fields) => {

			if (err) throw err;

            // Check is account exists
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
                console.log(`signed into user ${username}`)
                res.redirect("/")

			} else {
				res.send('Wrong username and/or password, please go back and try again!');
			}			
		});
	} else {
        res.send('Please enter Username and Password!');
    }
	
  });


module.exports = router;
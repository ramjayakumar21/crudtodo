const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
let taskList = require('./todos')

router.use(bodyParser.urlencoded({ extended: true }));


router.get("/", (req, res) => {
    console.log(req.body)
})

router.post('/addTask', (req, res) => {
    let newTask = { title:req.body.taskTitle, owner: "Ram"}
    taskList.push(newTask)
    res.redirect("/");
})

router.post('/addTask', (req, res) => {
    let newTask = { title:req.body.taskTitle, owner: "Ram"}
    taskList.push(newTask)
    res.redirect("/");
})

module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
let taskList = require('./todos')
router.use(bodyParser.urlencoded({ extended: true }));


router.get("/", (req, res) => {
    console.log(req.body)
})

router.post('/addtask', (req, res) => {
    let newTask = { title:req.body.taskTitle, owner: req.session.username, priority:req.body.priority}
    taskList.push(newTask)
    res.redirect("/");
})

router.post('/removetask', (req, res) => {
    let taskToRemove = req.body.check.filter((t) => t == req.session.username);

    console.log(taskToRemove)

    if (typeof taskToRemove == "object") {
        for (let i = 0; i < taskToRemove.length; i++) {
            taskList.splice(taskList.indexOf(taskToRemove[i]), 1);
        }
    }
    res.redirect('/')
})


router.post('/filtertask', (req, res) => {
    req.session.pfilter = req.body.filterval;
    
    res.redirect('/')
})



module.exports = router;
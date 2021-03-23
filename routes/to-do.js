const express = require('express');
const router = express.Router();

const {ensureAuthenticated, authRole} = require('../config/auth')

const {ToDo} = require("../models/to-do");



router.get('/', ensureAuthenticated, async function(req, res) {

  console.log(req.user._id)

  ToDo.find({owner: req.user._id}, function(err, data) {
      console.log
       res.render('to-do', {
           todos: data
       });
   });
})




router.post('/', ensureAuthenticated, (req,res)=>{

  let toDoObj = {
    title : req.body.title,
    text : req.body.text,
    startdate : req.body.startdate,
    deadline : req.body.deadline,
    priority : req.body.priority,
    owner : req.user._id
  }

  let newToDo = new ToDo(toDoObj);

  newToDo.save()
  .then((value)=>{
      console.log(value)
      req.flash('success_msg','Your to-do has been created');
      res.redirect('/to-do');
  })
  .catch(value=> console.log(value));
})


module.exports  = router;

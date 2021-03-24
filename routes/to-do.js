const express = require('express');
const router = express.Router();

const {ensureAuthenticated, authRole} = require('../config/auth')

const {ToDo, ToDoArchive} = require("../models/to-do");



router.get('/', ensureAuthenticated, async function(req, res) {

  //console.log(req.user._id)
  let toDoData;


  ToDo.find({owner: req.user._id}, function(err, obj) {

      var todoData = obj

       ToDoArchive.find({owner: req.user._id}, function(err, data) {
            res.render('to-do', {
                todoArchived: data,
                todos: todoData
            });
        });


   });




})


let toDoObj;

router.post('/', ensureAuthenticated, (req,res)=>{

  switch (req.body.formInstance) {
    case 'create':
    toDoObj = {
      title : req.body.title,
      text : req.body.text,
      startdate : req.body.startdate,
      deadline : req.body.deadline,
      priority : req.body.priority,
      owner : req.user._id
    }

    let toDo = new ToDo(toDoObj);

    toDo.save()
    .then((value)=>{
        console.log(value)
        req.flash('success_msg','Your to-do has been created');
        res.redirect('to-do');
    })
    .catch(value=> console.log(value));

    break;
    case 'archive':

      console.log(req.body)

      toDoObj = {
        title : req.body.title,
        text : req.body.text,
        startdate : req.body.startdate,
        deadline : req.body.deadline,
        priority : req.body.priority,
        owner : req.user._id
      }

      let toDoArcive = new ToDoArchive(toDoObj);

      ToDo.findOneAndDelete({owner: req.user._id}, async function(err,obj) { return obj })
      toDoArcive.save(function(error, savedDocument) {
          if (error) console.log(error)
          else {
            console.log(savedDocument + " has been saved");
          }
      })





    break;

  }

})


module.exports  = router;

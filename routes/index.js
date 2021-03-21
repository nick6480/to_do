const express = require('express');
const bodyParser  = require("body-parser");
const router  = express.Router();
const {ensureAuthenticated, authRole} = require('../config/auth')
const {ROLE} = require('../config/permissions')
const {UserReq, User} = require("../models/user");

//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard',{
        user: req.user
    });
})


router.get('/admin', ensureAuthenticated, authRole(ROLE.ADMIN), async function(req, res) {
    let query = UserReq.find()
        try {
            const users = await query.exec()
            res.render('admin', {
                users: users,
            })
        } catch {
            res.redirect('/')
        }
})

router.post('/admin', async function(req, res) {
  //console.log(req.body);
  console.log("req recived")
  //console.log(req.body)


  if (req.body.choice == 'decline') {
      UserReq.findOneAndDelete({email: req.body.email}, function(err,obj) {
        if (err) {
          console.log(err)
        }
        console.log('Declined user: ', obj)
      });
  } else if (req.body.choice == 'accept') {
      UserReq.findOne({email: req.body.email}, async function(err,obj) { return obj })
      .then(res =>{ //callback function
          user = new User(res)
          user.isNew = true;
          console.log(user)
          user.save(function(error, savedDocument) {
              if (error) console.log(error)
              else {
                console.log(savedDocument + " has been saved");
                UserReq.findOneAndDelete({email: req.body.email}, function(err,obj) {})
              }

          })
      })



  }

  res.redirect('/admin')
})

async function dbSave(myData, res) {

}






module.exports = router;

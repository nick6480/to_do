const express = require('express');
const router = express.Router();
const {UserReq, User} = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/register', (req,res)=>{
    res.render('register');
})

router.post('/', (req,res)=>{
    const {name,email, password, password2,} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2,
        role : 'basic'})
     } else {
        //validation passed

        // Checks both user and userreq collection for existing email
        User.findOne({email : email}).exec((err,user)=>{
          if(user) {
              errors.push({msg: 'email already registered'});
              res.render('register',{errors,name,email,password,password2})
             }
             else {
               UserReq.findOne({email : email}).exec((err,user)=>{
                 console.log(user);
                 if(user) {
                     errors.push({msg: 'email already registered'});
                     res.render('register',{errors,name,email,password,password2})
                    } else {


                    let userObj = {
                    name : name,
                    email : email,
                    password : password,
                    role : 'basic'
                    }


                    // If role is admin skip admin authentication (for debug purporse)
                    if (userObj.role == 'admin') {
                      var newUser = new User(userObj);
                    } else {
                      var newUser = new UserReq(userObj);
                    }

                     console.log(newUser);
                     //hash password
                     bcrypt.genSalt(10,(err,salt)=>
                     bcrypt.hash(newUser.password,salt,
                         (err,hash)=> {
                             if(err) throw err;
                                 //save pass to hash
                                 newUser.password = hash;
                             //save user
                             newUser.save()
                             .then((value)=>{
                                 console.log(value)
                                 req.flash('success_msg','You have now registered!');
                                 res.redirect('/login');
                             })
                             .catch(value=> console.log(value));

                         }));
                      }
               })
             }
        })

    }
    })




    module.exports = router;

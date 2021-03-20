const express = require('express');
const router  = express.Router();
const {ensureAuthenticated, authRole} = require('../config/auth')
const {ROLE} = require('../config/permissions')

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

router.get('/admin',ensureAuthenticated, authRole(ROLE.ADMIN), (req,res)=>{
    console.log(ROLE.ADMIN)
    res.render('admin');
    user: req.user
})

module.exports = router;

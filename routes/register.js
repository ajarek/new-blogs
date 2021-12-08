const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/register', (req, res) => {
    res.render('register')
})


//REGISTER
 router.post('/register', async (req,res)=>{
    
    if(req.body.password !== req.body.repeat){
        res.render('register', { errorMessage: 'Passwords do not match!'})
    }
           
    else{
    try{
        const salt= await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(req.body.password, salt)
       const newUser=new User({
          name: req.body.name,
           email: req.body.email,
           password: hashedPass,
       })
       const user=await newUser.save()
       res.render('login', { successMessage: 'Registered  '+user.name})
    }
    catch(err){
        res.render('register', { errorMessage: 'Status 500 ,An error happened!'})
    }
    }
})
module.exports = router
const express = require('express')
const router = express.Router()
const Blog = require("../models/Blog")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/auth')
let Name
let Name1

router.get('/write',authenticate, (req, res) => {
    Name= req.query.data
   Name1= Name[0].toUpperCase()+Name.slice(1).toLowerCase()
    res.render('write',{data:Name,data1:Name1})
})
router.post('/write', async (req,res )=>{
   
    
    try{
        
       const newBlog=new Blog({
           name:req.body.username, 
           title: req.body.title,
           photo: req.body.photo,
           text: req.body.text,
       })
       if(newBlog){
       const blog=await newBlog.save()
       console.log(blog.name)
       }
       res.redirect('/?data='+newBlog.name)
      
    }
    catch(err){
        res.render('home',{errorMessage:'Status 500 ,An error happened!'})
    }
    
})
module.exports = router
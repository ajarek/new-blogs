const express = require('express')
const router = express.Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysort = {updatedAt:-1}

router.get('/', async (req, res) => {
    try {
        let blogs
         blogs = await Blog.find({}).sort(mysort)
        res.render('home', {
            myhome: blogs
        })
    } catch (err) {
        res.status(500).send(err)
    }

})
router.get('/home/:id', async(req,res)=>{
    try{
    const {id}=req.params
    const getBlog=await Blog.findOne({_id: id})
    res.render('particularBlog',{blog:getBlog})  
} catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router

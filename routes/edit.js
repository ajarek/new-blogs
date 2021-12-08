const express = require('express')
const router = express.Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysort = {createdAt:-1}

router.get('/edit', async (req, res) => {
    try {
      let  Name= req.query.data
        let blogs
         blogs = await Blog.find({name:Name}).sort(mysort)
        res.render('edit', {
            myhome: blogs
        })
    } catch (err) {
        res.status(500).send(err)
    }

})
.get('/delete/:id',(req,res)=>{
    const{id}=req.params
    Blog.deleteOne({_id:id})
    .then(()=>{
        console.log('Deleted blog successfully!')
        res.redirect("/")
    })
     .catch((err)=>console.log(err))
    
})


module.exports = router

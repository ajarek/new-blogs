const router = require('express').Router()
const User = require('../models/User')
const Blog = require('../models/Blog')

    router.get('/editOne/:id',async(req,res)=>{
        const{id}=req.params
        const getData =await Blog.findOne({_id:id}) 
        res.render('editOne',{blog:getData})
    })
    .post('/editOne/:id',(req,res)=>{
        const{id}=req.params
        const {name,title,photo,text}=req.body
        Blog.updateOne({_id:id},{name,title,photo,text})
        .then(()=>{
            console.log('successfuly! updated the Post!')
            res.redirect('/')
        })
        .catch(err=>console.log(err))
    })
 
    
    module.exports=router
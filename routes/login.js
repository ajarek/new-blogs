const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login',async(req,res)=>{
    const user = await User.findOne({ email: req.body.email });
        if (!user) return  res.render('login', { errorMessage: 'Status 400 ,Invalid email or password! '})

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.render('login', { errorMessage: 'Status 400 ,Invalid email or password! '})
    const accessToken=jwt.sign({_id:this._id},process.env.TOKEN_SECRET,{expiresIn:1200})
    const refreshToken=jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:525600})
    res.cookie('jsonwebtoken', accessToken, {
		maxAge: 86400000,
		httpOnly: true,
	})
	
	res.redirect('/write/?data='+user.name)
	
	
})
router.get('/logout',async(req,res)=>{
   
	return res
   .cookie('jsonwebtoken','',{maxAge:1})
   .render('login',{ logautMessage: "Successfully logged out 😏 🍀" })
   
})
// router.get("/logout", (req, res) => {
//     return res
//       .clearCookie("access_token")
//       .status(200)
//       .render('home',{ message: "Successfully logged out 😏 🍀" })
//   });


module.exports = router
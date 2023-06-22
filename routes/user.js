const express = require('express');
const router = express.Router();
const User =require('../model/User')
const joi = require('@hapi/joi')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {auth} = require('../middleware/verify')

const schema=joi.object({
name:joi.string().min(6).required(),
email:joi.string().min(6).required().email(),
password:joi.string().min(6).required()


})

router.post('/register',async (req,res)=>{

    const {error} = await schema.validate(req.body) 
    if(error) return res.status(400).send(error.details[0].message)

    const emailexist = await User.findOne({email:req.body.email})
    if(emailexist) return res.status(400).send("Email already exists")  


    const salt = await bcrypt.genSalt(10)
    const hashpass =  await bcrypt.hash(req.body.password,salt)


console.log(req.body.name)
console.log(req.body.email)
console.log(req.body.password)


    
const user = new User(
{
name:req.body.name,
email:req.body.email,
password:hashpass

})
try{
const saveduser=await user.save()
res.send(saveduser)
}catch(err){


return res.status(400).send(err)
}




})

router.post('/login',async (req,res)=>{
const user = await User.findOne({email:req.body.email})

if(!user) return res.status(400).send("Email or Password is incorrect")

const passcheck=await bcrypt.compare(req.body.password,user.password)

if(!passcheck) return res.status(400).send("Email or Password is Incorrect")

const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
res.header('t-auth-token',token).send({token:token,user:{
id:user.id,
name:user.name

}})




})



router.post('/validtoken',async (req,res)=>{

try{
const token =req.header('t-auth-token')

if(!token) return res.send(false)

const verified = jwt.verify(token,process.env.TOKEN_SECRET)
if(!verified)  return res.json(false)

const user=await User.findById(verified._id)

if(!user) return res.json(false)

return res.json(true)


}catch(err){

    res.status(500).json({error:err.message})
}

})


router.get('/',auth, async (req,res)=>{
const user=await User.findById(req.user)

res.json(user)


})




module.exports = router
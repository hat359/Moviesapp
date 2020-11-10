const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/verify')
const Mylist =require('../model/Mylist')

router.post('/mymovies',auth,async (req,res)=>{
const mylist =await Mylist.find({userid:req.user})
if(mylist.length===0) return res.status(404).send("Not Found")
res.status(200).send(mylist)


})

router.post('/add',auth, async (req,res)=>{
const mylist= await new Mylist({
userid:req.user,
movieid:req.body.movieid,
movietitle: req.body.movietitle,
movieimg:req.body.movieimg ,

movierun:req.body.movierun,
tvtitle:req.body.tvtitle,
identifier:req.body.identifier


})
mylist.save((err,doc)=>{
if(err) return res.status(400).send("Not added")

return res.status(200).send("Added")

})



})


router.post('/added',auth,async (req,res)=>{

  const mylist= await Mylist.find({userid:req.user,movieid:req.body.movieid})
 if(mylist.length===0) return res.status(404).send('not found')

  res.status(200).send({success:true,added:true})

})



router.post("/remove", auth, (req, res) => {
    
  Mylist.findOneAndDelete({movieid:req.body.movieid,userid:req.user})
  .exec((err,doc)=>{
     if(err)return res.status(400).json({success:false,err})
     return res.status(200).json({success:true,doc})

  })
  });

module.exports=router
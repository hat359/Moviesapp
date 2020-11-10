const jwt=require('jsonwebtoken')

let  auth= async (req,res,next)=>{
const token=req.header('t-auth-token')

if(!token) return res.status(401).send('access denied')

try{
const verified =jwt.verify(token,process.env.TOKEN_SECRET)

if(!verified) {
    
    return res.status(401).send('Authorization denied')}

req.user=verified._id
next()

}catch(err){
res.status(400).send('Invalid Token')


}

}

module.exports={auth}
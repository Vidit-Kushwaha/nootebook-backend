var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_secret = process.env.JWT_SECRET;

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.send({error:"verify using valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_secret);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).send("error")
        console.log(error.message)
    }
}

module.exports=fetchuser;

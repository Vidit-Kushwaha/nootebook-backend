var jwt = require('jsonwebtoken');

const JWT_secret = "viditkushwaha%95.76"

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.send({error:"verify using valid token"})
    }
    const data=jwt.verify(token,JWT_secret);
    req.user=data.user;
    next();
}

module.exports=fetchuser;
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const verifyToken = (req,res,next)=>{
 
  const authHeader = req.headers.token;
  

  if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_SEC,(req,res,(err,user)=>{
      if(err) res.status(403).json("token is not valid");

      req.user = user;
      next();
    }))

  }else{
   return  res.status(401).json("there is no token");
  }

}

const verifyTokenAndAutherization = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin)
    {
      next();
    }else
    {
      res.status(403).json("you are not allow to do that");
    }
  })
}

const verifyTokenAndAdmin = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.isAdmin)
    {
      next();
    }else
    {
      res.status(403).json("you are not allow to do that");
    }
  })
}

module.exports = {verifyToken,verifyTokenAndAutherization,verifyTokenAndAdmin}
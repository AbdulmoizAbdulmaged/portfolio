const router = require('express').Router();
const User = require('../models/user');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register
router.post('/register',async (req,res)=>{
 const newUser = new User({
  username: req.body.username,
  email: req.body.email,
  password: Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
 });

 try{

  const saveUser = await newUser.save();

 res.status(201).json(saveUser);

 }catch(err)
 {
  res.status(500).json(err);
 }
 
 
});

//Login
router.post('/login',async (req,res)=>{

  
  try
  {
   const user = await User.findOne({username: req.body.username});

   !user && res.status(401).json('wrong credintials');

   const orgPassword =  Crypto.AES.decrypt(user.password,process.env.PASS_SEC).toString(Crypto.enc.Utf8);

   orgPassword !== req.body.password && res.status(401).json("wrong password credentials");

   const accessToken = jwt.sign(
    {
      id: user._id,isAdmin: user.isAdmin
    },
    process.env.JWT_SEC,
    {expiresIn: "3d"}
   );
   const {password, ...others} = user._doc;

   res.status(200).json({...others,accessToken});
   
   //

  

  

  }catch(err){
    res.status(500).json(err);
  }
  

})


module.exports = router;
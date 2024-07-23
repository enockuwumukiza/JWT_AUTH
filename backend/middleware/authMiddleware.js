require('dotenv').config();
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const protect = asyncHandler(async(req,res,next) =>{
  let token;
  token = req.cookies.jwt;
  if(!token) return res.status(400).json({message:"Not Authorized - Not token"});

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (err) {
    res.status(401).json({message:"Not Authorized - Invalid token"});
    throw new Error("Invalid token")
  }

})
module.exports = protect;
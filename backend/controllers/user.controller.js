const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

// Authenticate User
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password needed to login" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ message: "No such user" });
  }

  const isMatch = await foundUser.comparePasswords(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  generateToken(res, foundUser._id);
  res.status(200).json({name:foundUser?.name, email:foundUser?.email, password:foundUser?.password});
});

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "Email already exists. Please use another email!" });
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    return res.status(400).json({ message: "Invalid user data!" });
  }

  generateToken(res, user._id);
  res.status(201).json({ user:name });
});

// Logout User
const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict'
  });

  res.status(200).json({ message:"user logged out"});
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = req?.user; // Assuming req.user contains authenticated user's ID
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  if(!user) return res.status(400).json({message:"No found user"});

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if(req.body.password){
    user.password = req.body.password || user.password;
  }
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

module.exports = {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile
};

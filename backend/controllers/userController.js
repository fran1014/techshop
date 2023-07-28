import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

//@description Auth user & get token
//@route Post api/users/loging
//@access Public

const authUser = asyncHandler(async (req, res) => {
  res.send('auth user');
});

//@description Register user
//@route Post api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

//@description Log out user / clear cookie
//@route Post api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

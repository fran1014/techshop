import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

//@description Auth user & get token
//@route Post api/users/loging
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdminuser,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
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
  res.send('logout user');
});

//@description Get user profile
//@route Get api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

//@description Update user profile
//@route PUT api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

//@description Get users
//@route Get api/users
//@access Private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

//@description Get user by ID
//@route Get api/users/:id
//@access Private/admin

const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by ID');
});

//@description Delete user
//@route Delete api/users/:id
//@access Private/admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

//@description Update user
//@route Put api/users/:id
//@access Private/admin

const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};

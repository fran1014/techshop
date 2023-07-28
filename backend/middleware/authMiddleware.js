import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import user from '../models/userModel.js';
import { TLSSocket } from 'tls';

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  //Read the JWT from the cookie

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

//Admin Middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Course = require('../models/course');
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ ID: { $not: /^AD/ } }, '-password'); 
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } })) });
};

const getUsersOfCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  let users;
  try {
    users = await User.find({ enrolledCourses: courseId }, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } })) });
};

const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findOne({ ID: userId }, '-password');

    const enrolledCourseIds = user.enrolledCourses;
    const enrolledCourses = await Course.find({ ID: { $in: enrolledCourseIds } });
    
    const userWithEnrolledCourses = {
      ...user.toObject({ getters: true, transform: (doc, ret) => { delete ret._id; } }),
      enrolledCourses
    };
    user.enrolledCourses = enrolledCourses;
    res.json({ user: userWithEnrolledCourses });

  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Fetching user failed, please try again later.',
      500
    );
    return next(error);
  }
};

const signup = async (req, res, next) => {
  const { bio, fullName, email, password, image } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  if (existingUser) {
    res.json({ message: 'UserExist' });
  }

  const username = email.split('@')[0];
  const ID = 'SD' + username;

  const createdUser = new User({
    ID,
    bio,
    fullName,
    email,
    password,
    image
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  // Authentication using Tokens
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.ID, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.ID, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  } 

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.ID, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({
      userId: existingUser.ID,
      email: existingUser.email,
      token: token
    });
};

exports.getUsers = getUsers;
exports.getUsersOfCourse = getUsersOfCourse;
exports.getUser = getUser; 
exports.signup = signup;
exports.login = login;

const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS"){
    return next();
  }
  try {
    const token = req.headers.authorization.split(' '); // Authorization: 'adminId TOKEN'

    if (token.length !== 0 && token[1] && token[0].substring(0, 2) !== "SD") {
      const decodedToken = jwt.verify(token[1], 'supersecret_dont_share');
      req.userData = { userId: decodedToken.userId };
      next();
    }
    else{
      throw new Error('Authentication failed!');
    }
    
  } catch (err) {
    console.log(err);
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};

// changing the "notSD" to the userID and check admin from the user ID to secure the middleware 
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const uId = req.params.userId;
        const token = req.headers.authorization.split(' '); 

        if (token.length !== 0 && token[1] && uId === token[0]) {
            const decodedToken = jwt.verify(token[1], 'supersecret_dont_share');
            // req.userData = { userId: decodedToken.userId };
            next();
        }
        else {
            res.json({message: "noUser"});
        }

    } catch (err) {
        console.log(err);
        const error = new HttpError('Authentication failed!', 401);
        return next(error);
    }
};

// changing the "notSD" to the userID and check admin from the user ID to secure the middleware 
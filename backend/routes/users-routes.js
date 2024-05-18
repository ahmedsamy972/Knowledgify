const express = require('express');

const usersController = require('../controllers/users-controllers');
const checkAuth = require("../middleware/check-auth");
const checkLogin = require("../middleware/check-login");

const router = express.Router();

router.get('/', checkAuth, usersController.getUsers);
router.get('/course/:courseId', checkAuth, usersController.getUsersOfCourse);
router.get('/:userId', checkLogin, usersController.getUser);

router.post('/signup', usersController.signup);
router.post('/login', usersController.login); 

module.exports = router;

const express = require('express');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/course/:courseId', usersController.getUsersOfCourse);
router.get('/:userId', usersController.getUser);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login); 

module.exports = router;

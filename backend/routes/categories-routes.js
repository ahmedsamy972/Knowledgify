const express = require('express');

const checkAuth = require("../middleware/check-auth");
const categoriesController = require('../controllers/categories-controllers');
const coursesController = require('../controllers/courses-controllers');

const router = express.Router();

router.get('/', categoriesController.getCategories);

router.post('/new', checkAuth, categoriesController.createCategory);
router.get('/:categoryId', categoriesController.getCategory);

router.post('/:categoryId/courses/new', checkAuth, coursesController.createCourse);
router.get('/:categoryId/courses/:courseId', coursesController.getCourse);
router.patch('/:categoryId/courses/:courseId/enroll', coursesController.enrollInCourse);

module.exports = router;

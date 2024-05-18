const express = require('express');

const checkAuth = require("../middleware/check-auth");
const sectionsController = require('../controllers/sections-controllers');

const router = express.Router();

router.post('/:courseId/sections/new', checkAuth, sectionsController.createCourseSection);
router.get('/:courseId/sections/:sectionId', sectionsController.getCourseSection);
router.patch('/:courseId/sections/:sectionId/upload', checkAuth, sectionsController.uploadSectionVids);

module.exports = router;

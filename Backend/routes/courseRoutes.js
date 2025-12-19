const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, deleteCourse } = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

router.post('/', protect, adminOnly, createCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

module.exports = router;

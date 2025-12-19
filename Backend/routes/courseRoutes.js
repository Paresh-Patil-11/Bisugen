const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, deleteCourse } = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes (Admin only)
router.post('/', protect, adminOnly, createCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

module.exports = router;
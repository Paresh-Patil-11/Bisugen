const Course = require('../models/Course');

// Create new course (Admin only)
const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Validate input
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Create course
    const course = await Course.create({
      title,
      description,
      price,
      createdBy: req.user._id
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all courses (Public)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single course by ID (Public)
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name email');
    
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete course (Admin only)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (course) {
      await course.deleteOne();
      res.json({ message: 'Course removed successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse
};
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api';

function CourseList({ user }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/courses`);
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses available yet</h3>
          <p>Check back later for new courses!</p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <div 
              key={course._id} 
              className="course-card"
              onClick={() => handleCourseClick(course._id)}
            >
              <h3>{course.title}</h3>
              <p>{course.description.substring(0, 100)}...</p>
              <div className="course-price">₹{course.price}</div>
              <small style={{ color: '#999' }}>
                Created by: {course.createdBy?.name || 'Admin'}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;

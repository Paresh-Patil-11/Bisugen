import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/courses/${id}`);
      setCourse(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch course details');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${API_URL}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        alert('Course deleted successfully');
        navigate('/');
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (error || !course) {
    return <div className="error-message">{error || 'Course not found'}</div>;
  }

  return (
    <div className="container">
      <div className="course-details">
        <h2>{course.title}</h2>
        <div className="course-meta">
          <div>
            <strong>Price:</strong> ₹{course.price}
          </div>
          <div>
            <strong>Created by:</strong> {course.createdBy?.name || 'Admin'}
          </div>
          <div>
            <strong>Created on:</strong> {new Date(course.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="course-info">
          <h3>Description</h3>
          <p>{course.description}</p>
        </div>
        <div>
          <button className="back-btn" onClick={() => navigate('/')}>
            Back to Courses
          </button>
          {user && user.role === 'admin' && (
            <button className="delete-btn" onClick={handleDelete}>
              Delete Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;

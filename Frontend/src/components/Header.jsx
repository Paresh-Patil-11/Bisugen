import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Course Management
      </h1>
      <nav className="nav-links">
        <Link to="/">All Courses</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            {user.role === 'admin' && (
              <Link to="/create-course">Create Course</Link>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
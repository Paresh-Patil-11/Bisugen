# Course Management System

**Live:** https://bisugen-dev.onrender.com/
- Admin Login :
  email: paresh@gmail.com
  password : paresh

## API Endpoints

**User Stuff:**
- `POST /api/users/register` - Create new account
- `POST /api/users/login` - Login to your account
- `GET /api/users/profile` - Get your profile info

**Course Stuff:**
- `GET /api/courses` - See all courses
- `GET /api/courses/:id` - View one course
- `POST /api/courses` - Create course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

## What It Does

- Sign up and login with your email
- Different access for admins and regular users
- Admins can add and remove courses
- Everyone can browse courses
- Clean, simple design that works on phones too
- Passwords are encrypted for security

## Tech Used

React, Node.js, Express, MongoDB, JWT authentication
---

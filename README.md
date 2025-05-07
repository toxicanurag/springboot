# Student-Course Management System

## Overview
This is a Spring Boot application for managing student and course information. It allows users to:
- Add, view, and edit students and courses.
- Assign students to courses and list courses by student.
- Use JSP for views, Spring MVC for controllers, and Spring Data JPA for database interaction.

## Features
- **CRUD Operations**: Create, read, and update students and courses.
- **Student-Course Relationship**: A student can enroll in multiple courses.
- **View Lists**: View lists of all students and courses, with links to add or edit them.
- **Search**: Search courses by student name.
  
## Technologies Used
- **Backend**: Spring Boot, Spring MVC, Spring Data JPA
- **Frontend**: JSP, JSTL, Expression Language (EL)
- **Database**: H2 (In-memory) / MySQL (configurable)
- **Build Tool**: Maven
- 
- ### Prerequisites
- **Java 11+** (for Spring Boot)
- **Maven** (for project management)
- **MySQL or H2 Database** (H2 is configured by default)

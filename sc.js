// --- Controller Layer ---

package com.example.studentcourse.controller;

import com.example.studentcourse.entity.Student;
import com.example.studentcourse.entity.Course;
import com.example.studentcourse.service.StudentService;
import com.example.studentcourse.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class StudentCourseController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseService courseService;

    // Home page
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // List Students
    @GetMapping("/students")
    public String listStudents(Model model) {
        List<Student> students = studentService.getAllStudents();
        model.addAttribute("students", students);
        return "students";
    }

    // List Courses
    @GetMapping("/courses")
    public String listCourses(Model model) {
        List<Course> courses = courseService.getAllCourses();
        model.addAttribute("courses", courses);
        return "courses";
    }

    // Show Student Form
    @GetMapping("/students/new")
    public String showStudentForm(Model model) {
        model.addAttribute("student", new Student());
        return "student_form";
    }

    // Save Student
    @PostMapping("/students")
    public String saveStudent(@ModelAttribute Student student) {
        studentService.saveStudent(student);
        return "redirect:/students";
    }

    // Show Course Form
    @GetMapping("/courses/new")
    public String showCourseForm(Model model) {
        model.addAttribute("course", new Course());
        model.addAttribute("students", studentService.getAllStudents());
        return "course_form";
    }

    // Save Course
    @PostMapping("/courses")
    public String saveCourse(@ModelAttribute Course course) {
        courseService.saveCourse(course);
        return "redirect:/courses";
    }

    // Edit Student
    @GetMapping("/students/edit/{id}")
    public String editStudent(@PathVariable Long id, Model model) {
        Student student = studentService.getStudentById(id).orElseThrow();
        model.addAttribute("student", student);
        return "student_form";
    }

    // Edit Course
    @GetMapping("/courses/edit/{id}")
    public String editCourse(@PathVariable Long id, Model model) {
        Course course = courseService.getCourseById(id).orElseThrow();
        model.addAttribute("course", course);
        model.addAttribute("students", studentService.getAllStudents());
        return "course_form";
    }

    // Courses by student name
    @GetMapping("/courses/by-student")
    public String getCoursesByStudentName(@RequestParam String name, Model model) {
        List<Course> courses = courseService.getCoursesByStudentName(name);
        model.addAttribute("courses", courses);
        return "courses";
    }
}




// --- index.jsp ---
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>Home</title></head>
<body>
  <h1>Welcome to Student-Course Management</h1>
  <a href="/students">View Students</a> | 
  <a href="/courses">View Courses</a>
</body>
</html>

// --- students.jsp ---
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>Students</title></head>
<body>
  <h2>Student List</h2>
  <a href="/students/new">Add New Student</a>
  <table border="1">
    <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
    <c:forEach var="student" items="${students}">
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td><a href="/students/edit/${student.id}">Edit</a></td>
      </tr>
    </c:forEach>
  </table>
</body>
</html>

// --- student_form.jsp ---
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>Add/Edit Student</title></head>
<body>
  <h2>Student Form</h2>
  <form method="post" action="/students">
    <input type="hidden" name="id" value="${student.id}"/>
    Name: <input type="text" name="name" value="${student.name}"/><br/>
    Email: <input type="email" name="email" value="${student.email}"/><br/>
    <input type="submit" value="Save"/>
  </form>
</body>
</html>

// --- courses.jsp ---
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>Courses</title></head>
<body>
  <h2>Course List</h2>
  <a href="/courses/new">Add New Course</a>
  <form method="get" action="/courses/by-student">
    Search by Student Name: <input type="text" name="name"/>
    <input type="submit" value="Search"/>
  </form>
  <table border="1">
    <tr><th>ID</th><th>Title</th><th>Description</th><th>Student</th><th>Actions</th></tr>
    <c:forEach var="course" items="${courses}">
      <tr>
        <td>${course.id}</td>
        <td>${course.title}</td>
        <td>${course.description}</td>
        <td>${course.student.name}</td>
        <td><a href="/courses/edit/${course.id}">Edit</a></td>
      </tr>
    </c:forEach>
  </table>
</body>
</html>

// --- course_form.jsp ---
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>Add/Edit Course</title></head>
<body>
  <h2>Course Form</h2>
  <form method="post" action="/courses">
    <input type="hidden" name="id" value="${course.id}"/>
    Title: <input type="text" name="title" value="${course.title}"/><br/>
    Description: <input type="text" name="description" value="${course.description}"/><br/>
    Student:
    <select name="student.id">
      <c:forEach var="student" items="${students}">
        <option value="${student.id}" <c:if test="${student.id == course.student.id}">selected</c:if>>
          ${student.name}
        </option>
      </c:forEach>
    </select><br/>
    <input type="submit" value="Save"/>
  </form>
</body>
</html>

// --- End of JSP View Layer ---

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

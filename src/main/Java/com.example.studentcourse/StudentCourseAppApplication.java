package com.example.studentcourse;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.studentcourse.entity.Student;
import com.example.studentcourse.entity.Course;
import com.example.studentcourse.repository.StudentRepository;
import com.example.studentcourse.repository.CourseRepository;

import java.util.Arrays;

@SpringBootApplication
public class StudentCourseAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentCourseAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(StudentRepository studentRepo, CourseRepository courseRepo) {
        return (args) -> {
            for (int i = 1; i <= 10; i++) {
                Student student = new Student("Student " + i, "student" + i + "@example.com");
                studentRepo.save(student);

                Course course1 = new Course("Course A" + i, "Description A" + i, student);
                Course course2 = new Course("Course B" + i, "Description B" + i, student);
                courseRepo.saveAll(Arrays.asList(course1, course2));
            }
        };
    }
} 

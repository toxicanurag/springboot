package com.example.studentcourse.repository;

import com.example.studentcourse.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}

package com.example.studentcourse.repository;

import com.example.studentcourse.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c JOIN c.student s WHERE s.name = :name")
    List<Course> findCoursesByStudentName(@Param("name") String name);
}

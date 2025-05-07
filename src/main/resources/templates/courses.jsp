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

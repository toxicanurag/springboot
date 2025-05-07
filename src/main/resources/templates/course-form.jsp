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

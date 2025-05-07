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

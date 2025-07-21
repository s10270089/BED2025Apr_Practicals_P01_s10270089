// students.js
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/students');
  const students = await response.json();
  
  const studentsList = document.getElementById('students-list');
  students.forEach(student => {
    const studentItem = document.createElement('li');
    studentItem.innerHTML = `
      ${student.name} (${student.email}) 
      <button onclick="editStudent(${student.id})">Edit</button>
      <button onclick="deleteStudent(${student.id})">Delete</button>
    `;
    studentsList.appendChild(studentItem);
  });
});

function editStudent(id) {
  window.location.href = `/edit-student.html?id=${id}`;
}

async function deleteStudent(id) {
  const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
  if (res.ok) {
    alert('Student deleted!');
    location.reload();
  }
}

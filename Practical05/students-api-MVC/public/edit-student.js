// edit-student.js
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch(`/api/students/${studentId}`);
  const student = await res.json();
  
  document.getElementById('name').value = student.name;
  document.getElementById('email').value = student.email;
});

document.getElementById('edit-student-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const res = await fetch(`/api/students/${studentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  if (res.ok) {
    alert('Student updated!');
    window.location.href = 'students.html';
  }
});

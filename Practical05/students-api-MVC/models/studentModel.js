const db = require('../db');

exports.getAllStudents = async () => {
  const [rows] = await db.query('SELECT * FROM students');
  return rows;
};

exports.getStudentById = async (id) => {
  const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0];
};

exports.createStudent = async (name, age) => {
  const [result] = await db.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age]);
  return { id: result.insertId, name, age };
};

exports.updateStudent = async (id, name, age) => {
  await db.query('UPDATE students SET name = ?, age = ? WHERE id = ?', [name, age, id]);
};

exports.deleteStudent = async (id) => {
  await db.query('DELETE FROM students WHERE id = ?', [id]);
};

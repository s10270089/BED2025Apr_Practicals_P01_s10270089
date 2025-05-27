const studentModel = require('../models/studentModel');

exports.getAll = async (req, res, next) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const student = await studentModel.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const newStudent = await studentModel.createStudent(name, age);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name, age } = req.body;
    await studentModel.updateStudent(req.params.id, name, age);
    res.json({ message: 'Student updated' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await studentModel.deleteStudent(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    next(err);
  }
};

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent } = require('../validations/studentValidation');

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', validateStudent, studentController.create);
router.put('/:id', validateStudent, studentController.update);
router.delete('/:id', studentController.remove);

module.exports = router;

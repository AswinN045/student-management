const express = require('express');
const validate = require('../middlewares/validate');
const jwtAuthMiddleware = require('../middlewares/auth')
const studentController = require('../controllers/student.conroller');
const studentValidation = require('../validations/student.validation');
const authorizeRole = require('../middlewares/role');
const router = express.Router();

router.get('/get-tasks', jwtAuthMiddleware, authorizeRole(['student']), studentController.getTaskDetails);
router.patch('/update-task/:id', jwtAuthMiddleware, authorizeRole(['student']), validate(studentValidation.updateTask), studentController.updateTaskDetails);


module.exports = router;
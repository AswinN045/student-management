const express = require('express');
const validate = require('../middlewares/validate');
const jwtAuthMiddleware = require('../middlewares/auth')
const adminController = require('../controllers/admin.controller');
const adminValidation = require('../validations/admin.validation');
const authorizeRole = require('../middlewares/role');
const router = express.Router();

router.post('/create-student', jwtAuthMiddleware, authorizeRole(['admin']), validate(adminValidation.createStudent), adminController.createStudent);
router.post('/assign-task', jwtAuthMiddleware, authorizeRole(['admin']), validate(adminValidation.assignTasks), adminController.assignTasks);


module.exports = router;
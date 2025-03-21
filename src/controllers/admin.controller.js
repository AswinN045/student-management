const catchAsync = require('../utils/catchAsync');
const { userService, taskService } = require('../services');

const createStudent = catchAsync(async (req, res) => {
    const details = req.body;
    const studentData = await userService.createUser(details);
    if (studentData.statusValue === 0) {
        res.status(409).send(studentData)
    } else {
        const { password, ...user } = studentData.toJSON();
        res.status(201).send({ statusValue: 1, statusText: "Student added successfully", user });
    }
});

const assignTasks = catchAsync(async (req, res) => {
    const details = req.body;
    const data = await taskService.assignTasks(details, req.user.sub);
    if (data.statusValue === 0) {
        res.status(500).send(data)
    } else {
        res.status(201).send(data);
    }
});

module.exports = {
    createStudent,
    assignTasks
}
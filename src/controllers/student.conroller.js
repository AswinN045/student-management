const catchAsync = require('../utils/catchAsync');
const { userService, taskService } = require('../services');

const getTaskDetails = catchAsync(async (req, res) => {
    const data = await taskService.getTaskDetails(req.user.sub);
    if (data.statusValue === 0) {
        res.status(409).send(data)
    } else {
        res.status(200).send(data);
    }
});

const updateTaskDetails = catchAsync(async (req, res) => {
    const data = await taskService.updateTaskDetails(req.params.id, req.body);
    if (data.statusValue === 0) {
        res.status(409).send(data)
    } else {
        res.status(200).send(data);
    }
});

module.exports = {
    getTaskDetails,
    updateTaskDetails
}
const Task = require('../models/task.model');

const assignTasks = async (details, userId) => {
    try {
        const newTask = new Task({
            taskName: details.taskName,
            description: details.description,
            assignedBy: userId,
            assignedTo: details.studentId,
            dueTime: details.dueTime
        });

        await newTask.save();
        return { statusValue: 1, statusText: 'task assigned successflly' };
    } catch (error) {
        return { statusValue: 0, statusText: 'task assigned failed' };
    }
};

const getTaskDetails = async (userId) => {
    try {
        const data = await Task.find({ assignedTo: userId });
        return { statusValue: 1, statusText: 'task details fetched successflly', data };
    } catch (error) {
        return { statusValue: 0, statusText: 'task assigned failed' };
    }
};

const updateTaskDetails = async (id, details) => {
    try {
        const data = await Task.updateOne(
            { _id: id },  // Filter: Find task by ID
            { $set: { status: details.status } } // Update: Set new status
        );
        if (data.modifiedCount === 0) {
            return { statusValue: 0, statusText: 'failed to update task details' };
        } else {
            return { statusValue: 1, statusText: 'task details updated successflly' };

        }
    } catch (error) {
        return { statusValue: 0, statusText: 'task updation failed' };
    }
}

module.exports = {
    assignTasks,
    getTaskDetails,
    updateTaskDetails
}

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dueTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'overdue'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

taskSchema.pre('save', function (next) {
    if (this.dueTime < new Date()) {
        this.status = 'overdue';
    }
    next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

const Joi = require('joi')

const createStudent = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        department: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const assignTasks = {
    body: Joi.object().keys({
        taskName: Joi.string().required(),
        description: Joi.string().required(),
        studentId: Joi.string().required(),
        dueTime: Joi.string().required(),
    }),
};


module.exports = {
    createStudent,
    assignTasks
};

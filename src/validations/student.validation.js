const Joi = require('joi')

const getTaskDetails = {
};

const updateTask = {
    body: Joi.object().keys({
        status: Joi.string().required()
    }),
};


module.exports = {
    getTaskDetails,
    updateTask
};

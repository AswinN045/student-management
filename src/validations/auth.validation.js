const Joi = require('joi')

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};


module.exports = {
    login,
};

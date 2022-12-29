// Import package used to validate user information and login 
const Joi = require('@hapi/joi');


//Validate Login User
const login = data => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
}
//Validate Create User
const singin = data => {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(3)
            .required(),
        lastname: Joi.string()
            .min(3)
            .required(),
        username: Joi.string()
            .min(3)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    });
    return schema.validate(data);
}

module.exports.singin = singin
module.exports.login = login

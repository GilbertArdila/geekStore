const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.number().integer().min(6).max(8);

const createUserSchema = Joi.object({
  email:email.required(),
  password:password.required(),

});

const updateUserSchema = Joi.object({
  email,
  password
});

const getUserSchema = Joi.object({
  id: id.required()
});
const deleteUserSchema = Joi.object({
  id: id.required()
});

module.exports = {createUserSchema,updateUserSchema,getUserSchema,deleteUserSchema};

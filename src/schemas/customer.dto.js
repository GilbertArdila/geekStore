const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const role = Joi.string();

const createCustomerSchema = Joi.object({
  name:name.required(),
  lastName:lastName.required(),
  role:role.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  role,
});

const getCustomerSchema = Joi.object({
  id: id.required()
});
const deleteCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = {createCustomerSchema,updateCustomerSchema,getCustomerSchema,deleteCustomerSchema};

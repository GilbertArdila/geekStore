const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);

const createCustomerSchema = Joi.object({
  name:name.required(),
  lastName:lastName.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
});

const getCustomerSchema = Joi.object({
  id: id.required()
});
const deleteCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = {createCustomerSchema,updateCustomerSchema,getCustomerSchema,deleteCustomerSchema};

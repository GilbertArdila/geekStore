const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(10).max(10);
const userId = Joi.number().integer();
//to create a user in the same endpoint
const email = Joi.string().email();
const password = Joi.string().min(6).max(8);
//para los query params
const offset = Joi.number().integer();
const limit = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name:name.required(),
  lastName:lastName.required(),
  phone:phone.required(),
  //creamos el user en el mismo endpoint
  user:Joi.object({
    email:email.required(),
    password:password.required(),
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

const getCustomerSchema = Joi.object({
  id: id.required()
});
const deleteCustomerSchema = Joi.object({
  id: id.required()
});
//para los querys
const queryCustomerSchema = Joi.object({
  limit,
  offset,
  name,
  lastName,
  email
})

module.exports = {createCustomerSchema,updateCustomerSchema,getCustomerSchema,deleteCustomerSchema,queryCustomerSchema};

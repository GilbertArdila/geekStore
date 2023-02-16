const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const company = Joi.string();
const email = Joi.string().email();
const phone = Joi.string().min(10).max(10);
//para los query params
const offset = Joi.number().integer();
const limit = Joi.number().integer();

const createSupplierSchema = Joi.object({
  name:name.required(),
  company:company.required(),
  email:email.required(),
  phone:phone.required()
});

const updateSupplierSchema = Joi.object({
  name,
  company,
  email,
  phone
});

const getSupplierSchema = Joi.object({
  id: id.required()
});
const deleteSupplierSchema = Joi.object({
  id: id.required()
});
const querySupplierSchema = Joi.object({
  limit,
  offset,
  company,
  email,
  name
})

module.exports = {createSupplierSchema,updateSupplierSchema,getSupplierSchema,deleteSupplierSchema,querySupplierSchema};

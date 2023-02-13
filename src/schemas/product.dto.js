const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().max(100);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name:name.required(),
  price:price.required(),
  description:description.required(),
  image:image.required()
});

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image
});

const getProductSchema = Joi.object({
  id: id.required()
});
const deleteProductSchema = Joi.object({
  id: id.required()
});

module.exports = {createProductSchema,updateProductSchema,getProductSchema,deleteProductSchema};

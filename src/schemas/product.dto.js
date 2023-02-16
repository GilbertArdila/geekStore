const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().max(100);
const image = Joi.string().uri();
const categoryId= Joi.number().integer();
const supplierId= Joi.number().integer();
//para los query params
const offset = Joi.number().integer();
const limit = Joi.number().integer();
const min_price = Joi.number().integer();
const max_price = Joi.number().integer();

const createProductSchema = Joi.object({
  name:name.required(),
  price:price.required(),
  description:description.required(),
  image:image.required(),
  categoryId:categoryId.required(),
  supplierId:supplierId.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  categoryId,
  supplierId
});

const getProductSchema = Joi.object({
  id: id.required()
});
const deleteProductSchema = Joi.object({
  id: id.required()
});

//para los querys
const queryProductSchema = Joi.object({
  limit,
  offset,
  name,
  price,
  min_price,
  max_price: max_price.when('min_price',{
    is:Joi.number().integer(),
    then: Joi.required()
  })
})
module.exports = {createProductSchema,updateProductSchema,getProductSchema,deleteProductSchema,queryProductSchema};

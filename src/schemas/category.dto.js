const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const description = Joi.string().max(100);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name:name.required(),
  description:description.required(),
  image:image.required(),
});

const updateCategorySchema = Joi.object({
  name,
  description,
  image,
});

const getCategorySchema = Joi.object({
  id: id.required()
});
const deleteCategorySchema = Joi.object({
  id: id.required()
});

module.exports = {createCategorySchema,updateCategorySchema,getCategorySchema,deleteCategorySchema};

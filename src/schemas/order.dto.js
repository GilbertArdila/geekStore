const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const delivered = Joi.boolean();

const createOrderSchema = Joi.object({
  customerId:customerId.required(),

});

const updateOrderSchema = Joi.object({
  customerId,
  delivered
});

const getOrderSchema = Joi.object({
  id: id.required()
});
const deleteOrderSchema = Joi.object({
  id: id.required()
});

module.exports = {createOrderSchema,updateOrderSchema,getOrderSchema,deleteOrderSchema};

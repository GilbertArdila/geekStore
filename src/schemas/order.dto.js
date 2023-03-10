const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const delivered = Joi.boolean();
//schema para agregar el productto a la orden
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId:customerId.required(),

});
const additemSchema = Joi.object({
  orderId:orderId.required(),
  productId:productId.required(),
  amount:amount.required()
})

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

module.exports = {createOrderSchema,updateOrderSchema,getOrderSchema,deleteOrderSchema,additemSchema};

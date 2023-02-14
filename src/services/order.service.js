const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderServices {
  constructor(){
  }

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id){
   const order =await models.Order.findByPk(id);
    if(!order){
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id,changes){
    const order =await models.Order.findByPk(id);

     if(!order){
      throw boom.notFound('order not found');
     }
      const newOrderData = await order.update(changes);
      return newOrderData
   }

   async delete(id){
    const order =await models.Order.findByPk(id);

     if(!order){
      throw boom.notFound('order not found');
     }
     await order.destroy();
     return id

   }
}
module.exports = OrderServices;

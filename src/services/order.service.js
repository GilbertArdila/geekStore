const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderServices {
  constructor(){
  }

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  //para agregar un item a la orden

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

//anidamos la información de esa orden, el customer, el usuario de ese customer y los items de esa orden, estos son los alias dados en order.models
  async findOne(id){
    const order = await models.Order.findByPk(id, {
			include: [
				{
					association: 'customer',
					include: ['user'],
				},
        'items'
			],
		});
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

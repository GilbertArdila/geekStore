const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerServices {
  constructor(){
  }

  async create(data){
    //creamos el usuario en el mismo endpoint
    const newCustomer = await models.Customer.create(data,{
      include:['user']
    });
    return newCustomer;
  }

  async find(){
    //traemos anidados los datos del usuario
    const customers = await models.Customer.findAll({
      //este es el alias que le dimos en el customer.model, en la función associate
      include:['user']
    });
    return customers;
  }

  async findOne(id){
   const customer =await models.Customer.findByPk(id,{include:['orders','user']});
    if(!customer){
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id,changes){
    const customer =await models.Customer.findByPk(id);

     if(!customer){
      throw boom.notFound('customer not found');
     }
      const newCustomerData = await customer.update(changes);
      return newCustomerData
   }

   async delete(id){
    const customer =await models.Customer.findByPk(id);

     if(!customer){
      throw boom.notFound('customer not found');
     }
     await customer.destroy();
     return id

   }
}
module.exports = CustomerServices;

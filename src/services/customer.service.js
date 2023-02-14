const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerServices {
  constructor(){
  }

  async create(data){
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find(){
    const customers = await models.Customer.findAll();
    return customers;
  }

  async findOne(id){
   const customer =await models.Customer.findByPk(id);
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

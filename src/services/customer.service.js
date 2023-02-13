const boom = require('@hapi/boom');

class CustomerServices {
  constructor(){
    this.customers = []
  }

  async create(data){
    const newCustomer = {
      data
    }
    this.customers.push(newCustomer);
    return newCustomer;
  }
  async find(){
    return this.customers;
  }
  async findOne(id){
    const customer = this.customers.find(item => item.id === id);
    if(!customer){
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async update(id,changes){
    const index= this.customers.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('customer not found');
     }
     const product = this.customers[index];
      this.customers[index] = {...product,changes};
      return this.customers[index]
   }
   async delete(id){
     const index= this.customers.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('customer not found');
     }
     this.customers.splice(index,1);
     return id

   }
}
module.exports = CustomerServices;

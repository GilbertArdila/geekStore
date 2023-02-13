const boom = require('@hapi/boom');

class OrderServices {
  constructor(){
    this.orders = []
  }

  async create(data){
    const newOrder = {
      data
    }
    this.orders.push(newOrder);
    return newOrder;
  }
  async find(){
    return this.orders;
  }
  async findOne(id){
    const order =  this.orders.find(item => item.id === id);
    if(!order){
      throw boom.notFound('order not found')
    }
  }
  async update(id,changes){
    const index= this.orders.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('order not found')
     }
     const product = this.orders[index];
      this.orders[index] = {...product,changes};
      return this.orders[index]
   }
   async delete(id){
     const index= this.orders.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('order not found')
     }
     this.orders.splice(index,1);
     return id

   }
}
module.exports = OrderServices;

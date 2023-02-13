const boom = require('@hapi/boom');

class UserServices {
  constructor(){
    this.users = [];
  }
  async create(data){
    const newProduct = {
      data
    }
    this.users.push(newProduct);
    return newProduct;
  }
  async find(){
    return this.users;
  }
  async findOne(id){

   const service =  this.users.find(item => item.id === id);
   if(!service){
    throw boom.notFound('service not found');
   }
   return service;
  }
  async update(id,changes){
    const index= this.users.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('service not found');
    }
     const product = this.users[index];
      this.users[index] = {...product,changes};
      return this.users[index]
   }
   async delete(id){
     const index= this.users.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('service not found');
    }
     this.users.splice(index,1);
     return id

   }

}
module.exports = UserServices;

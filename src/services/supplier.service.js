const boom = require('@hapi/boom');

class SupplierServices {
  constructor(){
    this.suppliers = [];
  }
  async create(data){
    const newSupplier = {
      data
    }
    this.suppliers.push(newSupplier);
    return newSupplier;
  }
  async find(){
    return this.suppliers;
  }
  async findOne(id){
   const supplier= this.suppliers.find(item => item.id === id);
   if(!supplier){
    throw boom.notFound('Supplier not found');
   }
  }
  async update(id,changes){
    const index= this.suppliers.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('Supplier not found');
    }
     const product = this.suppliers[index];
      this.suppliers[index] = {...product,changes};
      return this.suppliers[index]
   }
   async delete(id){
     const index= this.suppliers.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('Supplier not found');
    }
     this.suppliers.splice(index,1);
     return id

   }

}
module.exports = SupplierServices;

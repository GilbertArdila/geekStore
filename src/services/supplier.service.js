const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SupplierServices {
  constructor(){
  }
  async create(data){
    const newSupplier = await models.Supplier.create(data);
    return newSupplier;
  }

  async find(){
    const suppliers = await models.Supplier.findAll();
    return suppliers;
  }

  async findOne(id){
   const supplier =await models.Supplier.findByPk(id);
    if(!supplier){
      throw boom.notFound('supplier not found');
    }
    return supplier;
  }

  async update(id,changes){
    const supplier =await models.Supplier.findByPk(id);

     if(!supplier){
      throw boom.notFound('supplier not found');
     }
      const newSupplierData = await supplier.update(changes);
      return newSupplierData
   }

   async delete(id){
    const supplier =await models.Supplier.findByPk(id);

     if(!supplier){
      throw boom.notFound('supplier not found');
     }
     await supplier.destroy();
     return id

   }
}
module.exports = SupplierServices;

const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SupplierServices {
  constructor(){
  }
  async create(data){
    const newSupplier = await models.Supplier.create(data);
    return newSupplier;
  }

  async find(query){
    const options = {
      where:{}
    };
    const {limit,offset,name,company,email} = query ;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    if(name){
      options.where.name = name
    }
    if(company){
      options.where.company = company
    }
    if(email){
      options.where.email = email
    }

    const suppliers = await models.Supplier.findAll(options);
    return suppliers;
  }

  async findOne(id){     //este es el alias que le dimos en supplier.model
   const supplier =await models.Supplier.findByPk(id,{include:['products']});
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

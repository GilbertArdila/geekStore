const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductServices {
  constructor(){
  }

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(){                               //este es el alias que le dimos en product.model, en la funcion associate
    const products = await models.Product.findAll({include:['category']});
    return products;
  }

  async findOne(id){  //este es el alias que le dimos en product.model, en la funcion associate
   const product =await models.Product.findByPk(id,{include:['category','supplier']});
    if(!product){
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id,changes){
    const product =await models.Product.findByPk(id);

     if(!product){
      throw boom.notFound('product not found');
     }
      const newProductData = await product.update(changes);
      return newProductData
   }

   async delete(id){
    const product =await models.Product.findByPk(id);

     if(!product){
      throw boom.notFound('product not found');
     }
     await product.destroy();
     return id

   }
}
module.exports = ProductServices;

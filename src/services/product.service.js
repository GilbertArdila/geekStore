const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const {Op} = require('sequelize');
class ProductServices {
  constructor(){
  }

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query){
    const options = {
      include:['category'],
      where:{}
    };
    const {limit,offset,name,price,max_price,min_price} = query ;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    if(name){
      options.where.name = name
    }
    if(price){
      options.where.price = price
    }
    if(min_price && max_price){
      options.where.price = {
        [Op.gte]:min_price,
        [Op.lte]:max_price
      };
    }
    const products = await models.Product.findAll(options);
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

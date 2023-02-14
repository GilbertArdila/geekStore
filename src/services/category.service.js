const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryServices {
  constructor(){
  }

  async create(data){
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(){
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id){
   const category =await models.Category.findByPk(id);
    if(!category){
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id,changes){
    const category =await models.Category.findByPk(id);

     if(!category){
      throw boom.notFound('category not found');
     }
      const newCategoryData = await category.update(changes);
      return newCategoryData
   }

   async delete(id){
    const category =await models.Category.findByPk(id);

     if(!category){
      throw boom.notFound('category not found');
     }
     await category.destroy();
     return id

   }
}
module.exports = CategoryServices;

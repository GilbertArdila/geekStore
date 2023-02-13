const boom = require('@hapi/boom');

class CategoryServices {
  constructor(){
    this.categories = []
  }

  async create(data){
    const newCategory = {
      data
    }
    this.categories.push(newCategory);
    return newCategory;
  }
  async find(){
    return this.categories;
  }
  async findOne(id){
    const category =  this.categories.find(item => item.id === id);
    if(!category){
      throw boom.notFound('category not found')
    }
  }
  async update(id,changes){
    const index= this.categories.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('category not found')
     }
     const product = this.categories[index];
      this.categories[index] = {...product,changes};
      return this.categories[index]
   }
   async delete(id){
     const index= this.categories.findIndex(item => item.id === id);
     if(index === -1){
      throw boom.notFound('category not found')
     }
     this.categories.splice(index,1);
     return id

   }
}
module.exports = CategoryServices;


const boom = require('@hapi/boom');
class ProductServices {
  constructor(){
    this.products = []
  }

  async create(data){
    const newProduct = {data};
    this.products.push(newProduct);
    return newProduct;
  }
  async find(){
    return this.products;
  }
  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Product not found')
    }
    return product;
  }
  async update(id,changes){
   const index= this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
     this.products[index] = {...product,changes};
     return this.products[index]
  }
  async delete(id){
    const index= this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found')
    }
    this.products.splice(index,1);
    return id

  }
}
module.exports = ProductServices;

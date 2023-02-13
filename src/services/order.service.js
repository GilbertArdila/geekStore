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
    return this.orders.find(item => item.id === id);
  }
  async update(id,changes){
    const index= this.orders.findIndex(item => item.id === id);
     if(index === -1){
       throw new Error('404 not found')
     }
     const product = this.orders[index];
      this.orders[index] = {...product,changes};
      return this.orders[index]
   }
   async delete(id){
     const index= this.orders.findIndex(item => item.id === id);
     if(index === -1){
       throw new Error('404 not found')
     }
     this.orders.splice(index,1);
     return id

   }
}
module.exports = OrderServices;

class CustomerServices {
  constructor(){
    this.customers = []
  }

  async create(data){
    const newCustomer = {
      data
    }
    this.customers.push(newCustomer);
    return newCustomer;
  }
  async find(){
    return this.customers;
  }
  async findOne(id){
    return this.customers.find(item => item.id === id);
  }
  async update(id,changes){
    const index= this.customers.findIndex(item => item.id === id);
     if(index === -1){
       throw new Error('404 not found')
     }
     const product = this.customers[index];
      this.customers[index] = {...product,changes};
      return this.customers[index]
   }
   async delete(id){
     const index= this.customers.findIndex(item => item.id === id);
     if(index === -1){
       throw new Error('404 not found')
     }
     this.customers.splice(index,1);
     return id

   }
}
module.exports = CustomerServices;

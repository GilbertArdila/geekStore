class UserServices {
  constructor(){
    this.users = [];
  }
  async create(data){
    const newProduct = {
      data
    }
    this.users.push(newProduct);
    return newProduct;
  }
  async find(){
    return this.users;
  }
  async findOne(id){
    return this.users.find(item => item.id === id);
  }
  async update(id,changes){
    const index= this.users.findIndex(item => item.id === id);
     if(index === -1){
       throw new Error('404 not found')
     }
     const product = this.users[index];
      this.users[index] = {...product,changes};
      return this.users[index]
   }
   async delete(id){
     const index= this.users.findIndex(item => item.id === id);
     if(index === -1){
       throw new Error('404 not found')
     }
     this.users.splice(index,1);
     return id

   }

}
module.exports = UserServices;

const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserServices {
  constructor() {
  }
  async create(data){
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find(){
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id){
   const user =await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id,changes){
    const user =await models.User.findByPk(id);

     if(!user){
      throw boom.notFound('User not found');
     }
      const newUserData = await user.update(changes);
      return newUserData
   }

   async delete(id){
    const user =await models.User.findByPk(id);

     if(!user){
      throw boom.notFound('User not found');
     }
     await user.destroy(user);
     return id

   }
}
module.exports = UserServices;

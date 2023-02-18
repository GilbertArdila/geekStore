const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserServices {
  constructor() {
  }
  async create(data){
    //encriptamos el password
    const hash =await bcrypt.hash(data.password,10);
    const newUser = await models.User.create({
      ...data,
      password:hash
    });
    //quitamos el password del return
    delete newUser.dataValues.password;
    return newUser;
  }

  async find(){
    //traemos anidados los datos del customer
    const users = await models.User.findAll({
       //este es el alias que le dimos en el user.model, en la función associate
      include:['customer']
    });
    return  users;
  }

  async findByEmail(email){
    const user = await models.User.findOne({
      where:{email}
    });
    return user;
  }

  async findOne(id){
   const user =await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
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
     await user.destroy();
     return id

   }
}
module.exports = UserServices;

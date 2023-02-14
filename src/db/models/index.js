const {User,UserSchema} = require('./user.model');

//recibimos sequelize de libs/sequelize
const setupModels = (sequelize) =>{
  //enviamos el sequealize a la función consfig en user.model
  User.init(UserSchema,User.config(sequelize));
};

module.exports = setupModels;

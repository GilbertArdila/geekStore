const {Model,Sequelize,DataTypes} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  //PK
   id:{
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
   },
   email:{
    allowNull:false,
    type:DataTypes.STRING,
    //each user has a unique mail, can not be two equals
    unique:true
   },
   password:{
    allowNull:false,
    type:DataTypes.STRING
   },
   createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
   },
   updatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'updated_at',
    defaultValue: Sequelize.NOW
   }
}
class User extends Model{
  static associate(){
    //models
  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:USER_TABLE,
      modelName:'User',
      timestamp:false
    }
  };
};

module.exports = {USER_TABLE,UserSchema,User};

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
   role:{
    allowNull:false,
    type:DataTypes.STRING,
    defaultValue:'customer'
   },
   recoveryToken:{
    //de hecho es nulo al inicio
    allowNull: true,
    type:DataTypes.STRING,
    field:'recovery_token',
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
  static associate(models){
    //asociación bidireccional, esta relación se resuelve del lado del customer con la FK, el usario tiene un customer
    this.hasOne(models.Customer,{
      as:'customer',
      //FK en customer.model
      foreignKey:'userId'
    });
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

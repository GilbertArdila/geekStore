const {Model,Sequelize,DataTypes} = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  //PK
   id:{
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
   },
   name:{
    allowNull:false,
    type:DataTypes.STRING,
   },
   lastName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'last_name',

   },
   role:{
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
class Customer extends Model{
  static associate(){
    //models
  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:CUSTOMER_TABLE,
      modelName:'Customer',
      timestamp:false
    }
  };
};

module.exports = {CUSTOMER_TABLE,CustomerSchema,Customer};

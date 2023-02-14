const {Model,Sequelize,DataTypes} = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
   price:{
    allowNull:false,
    type:DataTypes.INTEGER
   },
   description:{
    allowNull:false,
    type:DataTypes.STRING
   },
   image:{
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
class Product extends Model{
  static associate(){
    //models
  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:PRODUCT_TABLE,
      modelName:'Product',
      timestamp:false
    }
  };
};

module.exports = {PRODUCT_TABLE,ProductSchema,Product};

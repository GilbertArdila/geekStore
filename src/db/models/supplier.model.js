const {Model,Sequelize,DataTypes} = require('sequelize');

const SUPPLIER_TABLE = 'suppliers';

const SupplierSchema = {
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
    //each Supplier has a unique mail, can not be two equals
    unique:true
   },
   name:{
    allowNull:false,
    type:DataTypes.STRING
   },
   company:{
    allowNull:false,
    type:DataTypes.STRING
   },
   phone:{
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
class Supplier extends Model{
  static associate(){
    //models
  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:SUPPLIER_TABLE,
      modelName:'Supplier',
      timestamp:false
    }
  };
};

module.exports = {SUPPLIER_TABLE,SupplierSchema,Supplier};

const {Model,Sequelize,DataTypes} = require('sequelize');

const ORDER_TABLE = 'Orders';

const OrderSchema = {
  //PK
   id:{
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
   },
   delivered:{
    allowNull:false,
    type:DataTypes.BOOLEAN,
   defaultValue:false
   },
   customerId:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'customer_id',


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
class Order extends Model{
  static associate(){
    //models
  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:ORDER_TABLE,
      modelName:'Order',
      timestamp:false
    }
  };
};

module.exports = {ORDER_TABLE,OrderSchema,Order};

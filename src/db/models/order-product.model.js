const {Model,Sequelize,DataTypes} = require('sequelize');
const {ORDER_TABLE} = require('./order.model');
const {PRODUCT_TABLE} = require('./product.model');
const ORDER_PRODUCT_TABLE = 'orders_products';

//creamos un item para la orden de compra y le damos a qué orden pertenece, qué producto es y la cantidad del mismo
const OrderProductSchema = {
  //PK
   id:{
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
   },
    amount:{
      allowNull: false,
      type:DataTypes.INTEGER
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
   },
   //fk a qué orden de compra pertenece
   orderId:{
    field:'order_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    references:{
      model:ORDER_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
   },
   //FK qué producto es
   productId:{
    field:'product_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    references:{
      model:PRODUCT_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
   }
}
class OrderProduct extends Model{
  static associate(){


  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:ORDER_PRODUCT_TABLE,
      modelName:'OrderProduct',
      timestamp:false
    }
  };
};

module.exports = {ORDER_PRODUCT_TABLE,OrderProductSchema,OrderProduct};

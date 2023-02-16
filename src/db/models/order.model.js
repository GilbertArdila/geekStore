const {Model,Sequelize,DataTypes} = require('sequelize');
const {CUSTOMER_TABLE} = require('./customer.model')

const ORDER_TABLE = 'orders';

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
   //FK un cliente, muchas ordenes
   customerId:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'customer_id',
    references:{
     model:CUSTOMER_TABLE,
     key:'id'
    },
    onUpdate: 'CASCADE',
    onDelete:'SET NULL'
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
  static associate(models) {
		this.belongsTo(models.Customer, {
			as: 'customer'
		});
	}
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

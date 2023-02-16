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
   },
   //dato virtual para calcular el total de la orden
   total:{
    type:DataTypes.VIRTUAL,
    get(){
      //este items es el alias de la associate belongsToMany
      if(this.items && this.items.length >0){
        return this.items.reduce((total,item) =>{
          return (item.price * item.OrderProduct.amount);
        },0)
      }
      return 0;
    }

   }
}
class Order extends Model{
  static associate(models) {
		this.belongsTo(models.Customer, {
			as: 'customer'
		});
    //una orden tiene muchos productos y los llamamos items a traves de la tabla pivot orderProdut
    this.belongsToMany(models.Product,{
      as:'items',
      through: models.OrderProduct,
      foreignKey:'orderId',
      otherKey:'productId'
    })
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

const {Model,Sequelize,DataTypes} = require('sequelize');
const { USER_TABLE } = require('./user.model');

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
   phone:{
    allowNull:false,
    type:DataTypes.STRING,
    //can not be two equeal phones, to avoid create the same customer twice
    unique:true,
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
   //fk
   userId:{
    field:'user_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    //two customers can not have the same userId
    unique:true,
    references:{
      model:USER_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
   }
}
class Customer extends Model{
  static associate(models){
    //un customer está relacionado a un usuario uno a uno, la relación queda desde el lado del customer bajo la FK, no del user
    this.belongsTo(models.User,{as:'user'})
    //un cliente muchas ordenes de compra
    this.hasMany(models.Order,{
      as:'orders',
      //este es el alias en order.model
      foreignKey:'customerId'
    })
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

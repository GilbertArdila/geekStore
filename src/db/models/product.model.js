const {Model,Sequelize,DataTypes} = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const { SUPPLIER_TABLE } = require('./supplier.model');

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
    type:DataTypes.TEXT
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
   },
   //fk one product one category
   categoryId:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'category_id',
    references:{
      model: CATEGORY_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
   },
   supplierId:{
    allowNull:false,
    type:DataTypes.INTEGER,
    field:'supplier_id',
    references:{
      model: SUPPLIER_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
   }
};
class Product extends Model{
  static associate(models){
    //un producto tiene una categoria o pertenece a una categoria, tambien podríamos asociar el proveedor pero mejor no
    this.belongsTo(models.Category,{
      as:'category'
    })
    this.belongsTo(models.Supplier,{
      as:'supplier'
    })
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

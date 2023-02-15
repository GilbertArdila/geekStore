const {Model,Sequelize,DataTypes} = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
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
    //each category has a unique name
    unique:true
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
class Category extends Model{
  static associate(models){
   //una categoria puede tener muchos productos
   this.hasMany(models.Product,{
    as:'products',
    //FK del product.model
    foreignKey:'categoryId'
  })
  };
  //recibimos el sequelizer del models/index.js
  static config(sequelize){
    return {
      sequelize,
      tableName:CATEGORY_TABLE,
      modelName:'Category',
      timestamp:false
    }
  };
};

module.exports = {CATEGORY_TABLE,CategorySchema,Category};

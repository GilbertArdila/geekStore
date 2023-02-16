const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');
const { Product, ProductSchema } = require('./product.model');
const { Supplier, SupplierSchema } = require('./supplier.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

//recibimos sequelize de libs/sequelize
const setupModels = (sequelize) => {
  //enviamos el sequealize a la función consfig en user.model
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Supplier.init(SupplierSchema, Supplier.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //ejecutando asociaciones, le enviamos los modelos a la función associate en los .model.js
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Supplier.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
};

module.exports = setupModels;

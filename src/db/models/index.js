const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');
const { Product, ProductSchema } = require('./product.model');
const { Supplier, SupplierSchema } = require('./supplier.model');

//recibimos sequelize de libs/sequelize
const setupModels = (sequelize) => {
  //enviamos el sequealize a la función consfig en user.model
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Supplier.init(SupplierSchema, Supplier.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
};

module.exports = setupModels;

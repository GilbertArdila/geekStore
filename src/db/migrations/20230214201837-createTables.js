'use strict';
const { UserSchema, USER_TABLE } = require('../models/user.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model');
const { SupplierSchema, SUPPLIER_TABLE } = require('../models/supplier.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');
const { OrderSchema, ORDER_TABLE } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(SUPPLIER_TABLE, SupplierSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    // await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down(queryInterface) {
    // await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(SUPPLIER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};

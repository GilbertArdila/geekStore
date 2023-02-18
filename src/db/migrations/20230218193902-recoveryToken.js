'use strict';
const {  USER_TABLE } = require('../models/user.model');
const {Sequelize} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token',{
      allowNull: true,
      type:Sequelize.DataTypes.STRING,
      field:'recovery_token'
    });

  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');

  }
};

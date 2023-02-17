const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');



const sequelize = new Sequelize(config.dbUrl, { dialect: 'postgres', logging: true });

//enviamos sequelize a setupModels en db/models/index.js
setupModels(sequelize);

module.exports = sequelize;

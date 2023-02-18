const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerServices {
  constructor() {}

  async create(data) {
    //encriptamos el password del user
    const hash = await bcrypt.hash(data.user.password, 10);
    //cambiaos el password por el hash
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    //creamos el usuario en el mismo endpoint
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    //quitamos el password del return
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async find(query) {
    //este es el alias que le dimos en el customer.model, en la función associate
    const options = {
      include: ['user'],
      where: {},
    };
    const { limit, offset, name, lastName } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (name) {
      options.where.name = name;
    }
    if (lastName) {
      options.where.lastName = lastName;
    }

    //traemos anidados los datos del usuario
    const customers = await models.Customer.findAll(options);

    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['orders', 'user'],
    });
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    delete customer.user.dataValues.password;

    return customer;
  }

  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('customer not found');
    }
    const newCustomerData = await customer.update(changes);
    return newCustomerData;
  }

  async delete(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('customer not found');
    }
    await customer.destroy();
    return id;
  }
}
module.exports = CustomerServices;

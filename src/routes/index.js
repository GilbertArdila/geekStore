const Express = require('express');

const usersRouter = require('./user.routes');
const categoriesRouter = require('./category.routes');
const customersRouter = require('./customer.routes');
const ordersRouter = require('./order.routes');
const productsRouter = require('./product.routes');
const suppliersRouter = require('./supplier.routes');

const routerApi = (app) => {
  const router = Express.Router();

  //definimos la ruta o endpoint base
  app.use('/api/v1', router);
  //definimos las rutas
  router.use('/users', usersRouter),
    router.use('/categories', categoriesRouter),
    router.use('/customers', customersRouter),
    router.use('/orders', ordersRouter),
    router.use('/products', productsRouter),
    router.use('/suppliers', suppliersRouter);
};

module.exports = routerApi;

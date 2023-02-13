const usersRouter = require('./user.routes');
const categoriesRouter = require('./category.routes');
const customersRouter = require('./customer.routes');
const ordersRouter = require('./order.routes');
const productsRouter = require('./product.routes');
const suppliersRouter = require('./supplier.routes');

const routerApi = (app) => {
  //definimos las rutas
   app.use('/users',usersRouter),
   app.use('/categories',categoriesRouter),
   app.use('/customers',customersRouter),
   app.use('/orders',ordersRouter),
   app.use('/products',productsRouter),
   app.use('/suppliers',suppliersRouter)
};

module.exports = routerApi;

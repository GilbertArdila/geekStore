const express = require('express');
const passport = require('passport')
const ckeckRoles = require('../middlewares/auth.handler');

const router = express.Router();
const CustomerServices = require('../services/customer.service');
const service = new CustomerServices();
const validatorHandler = require('../middlewares/validatorHandler');
const {getCustomerSchema,updateCustomerSchema,createCustomerSchema,deleteCustomerSchema,queryCustomerSchema} = require('../schemas/customer.dto');
//query params
router.get('/',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(queryCustomerSchema,'query'),
 async (req, res, next) => {
  try {
    const customers = await service.find(req.query);
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(getCustomerSchema,'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});
router.post('/',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(createCustomerSchema,'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newCustomer = await service.create(body);
    res.json(newCustomer);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(getCustomerSchema,'params'),
validatorHandler(updateCustomerSchema,'body'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newCustomerData = await service.update(id, body);
    res.json(newCustomerData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(deleteCustomerSchema,'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

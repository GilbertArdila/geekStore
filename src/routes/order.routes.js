const express = require('express');
const passport = require('passport')
const ckeckRoles = require('../middlewares/auth.handler');

const router = express.Router();
const OrderServices = require('../services/order.service');
const validatorHandler = require ('../middlewares/validatorHandler');
const {createOrderSchema,updateOrderSchema,getOrderSchema,deleteOrderSchema,additemSchema} = require('../schemas/order.dto');
const service = new OrderServices();


router.get('/',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
 async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),

validatorHandler(getOrderSchema,'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});
router.post('/',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin','customer'),
validatorHandler(createOrderSchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const newOrder = await service.create(body);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});

//post para agregar item a la orden
router.post('/add-item',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin','customer'),
validatorHandler(additemSchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin','customer'),
validatorHandler(getOrderSchema,'params'),
validatorHandler(updateOrderSchema,'body'),

 async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newOrderData = await service.update(id, body);
    res.json(newOrderData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin','customer'),
validatorHandler(deleteOrderSchema,'params'),
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

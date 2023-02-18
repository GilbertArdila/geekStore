const express = require('express');
const passport = require('passport')
const OrderServices = require('../services/order.service');

const router = express.Router();
const service = new OrderServices();

router.get('/my-orders',
passport.authenticate('jwt',{session:false}),
 async (req, res, next) => {
  try {
      //este usuario nos lo envia el utils/auth/strategies/local.Strategy en el done si todo sale bien
      const user = req.user;
    //el sub lo envia el payload de auth.routes
    const orders = await service.findByUser(user.sub);
     res.json(orders);
  } catch (error) {
    next(error);
  }
});
module.exports = router;

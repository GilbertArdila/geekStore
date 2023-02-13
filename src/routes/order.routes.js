const express =require('express');
const router = express.Router();
const OrderServices = require('../services/order.service');

const service = new OrderServices();

//query params
router.get('/',async(req,res) => {
  const orders =await service.find()
  res.json(orders);
});

router.get('/:id',async(req,res) => {
  const {id} = req.params;
 const order =await service.findOne(id);
  res.json(order);
});
router.post('/',async (req, res) => {
  const body = req.body;
  const newOrder =await service.create(body);
  res.json(newOrder);


});

router.patch('/:id',async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const newOrderData =await service.update(id,body);
  res.json(newOrderData)
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  const response =await service.delete(id);
  res.json(response);
});

module.exports = router;

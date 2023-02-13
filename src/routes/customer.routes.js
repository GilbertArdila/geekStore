const express =require('express');
const router = express.Router();
const CustomerServices = require('../services/customer.service');
const service = new CustomerServices();

//query params
router.get('/',async(req,res) => {
  const customers =await service.find()
  res.json(customers);
});

router.get('/:id',async(req,res) => {
  const {id} = req.params;
 const customer =await service.findOne(id);
  res.json(customer);
});
router.post('/',async (req, res) => {
  const body = req.body;
  const newCustomer =await service.create(body);
  res.json(newCustomer);


});

router.patch('/:id',async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const newCustomerData =await service.update(id,body);
  res.json(newCustomerData)
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  const response =await service.delete(id);
  res.json(response);
});

module.exports = router;

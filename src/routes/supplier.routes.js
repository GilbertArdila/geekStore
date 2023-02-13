const express =require('express');
const router = express.Router();
const SupplierServices = require('../services/supplier.service');
const service = new SupplierServices();

//query params
router.get('/',async(req,res) => {
  const suppliers =await service.find();
  res.json(suppliers);
});
router.get('/:id',async(req,res) => {
  const {id} = req.params;
 const supplier =await service.findOne(id)
  res.json(supplier);
});
router.post('/',async (req, res) => {
  const body = req.body;
  const newSupplier =await service.create(body);
  res.json(newSupplier);


});

router.patch('/:id',async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const newSupplierData =await service.update(id,body);
  res.json(newSupplierData)
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  const response =await service.delete(id);
  res.json(response);
});

module.exports = router;

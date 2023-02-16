const express = require('express');
const router = express.Router();
const SupplierServices = require('../services/supplier.service');
const service = new SupplierServices();
const validatorHandler = require('../middlewares/validatorHandler');
const {createSupplierSchema,updateSupplierSchema,getSupplierSchema,deleteSupplierSchema,querySupplierSchema} = require('../schemas/supplier.dto');
//query params
router.get('/',
validatorHandler(querySupplierSchema,'query'),
 async (req, res, next) => {
  try {
    const suppliers = await service.find(req.query);
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',
validatorHandler(getSupplierSchema,'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await service.findOne(id);
    res.json(supplier);
  } catch (error) {
    next(error);
  }
});
router.post('/',
validatorHandler(createSupplierSchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const newSupplier = await service.create(body);
    res.json(newSupplier);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
validatorHandler(getSupplierSchema,'params'),
validatorHandler(updateSupplierSchema,'body'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newSupplierData = await service.update(id, body);
    res.json(newSupplierData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
validatorHandler(deleteSupplierSchema,'params'),
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

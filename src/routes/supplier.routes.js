const express = require('express');
const router = express.Router();
const SupplierServices = require('../services/supplier.service');
const service = new SupplierServices();

//query params
router.get('/', async (req, res, next) => {
  try {
    const suppliers = await service.find();
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await service.findOne(id);
    res.json(supplier);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newSupplier = await service.create(body);
    res.json(newSupplier);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newSupplierData = await service.update(id, body);
    res.json(newSupplierData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

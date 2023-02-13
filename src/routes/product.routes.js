const express = require('express');
const ProductServices = require('../services/product.service');
const validatorHandler = require('../middlewares/validatorHandler');
const {getProductSchema,createProductSchema,updateProductSchema,deleteProductSchema} = require('../schemas/product.dto');

const router = express.Router();
const service = new ProductServices();

//query params
router.get('/',
async (req, res,next) => {
  try {
    const products = await service.find();
  res.json(products);
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
validatorHandler(getProductSchema,'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
validatorHandler(createProductSchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newProductData = await service.update(id, body);
    res.json(newProductData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
validatorHandler(deleteProductSchema,'params'),
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

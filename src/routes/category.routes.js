const express = require('express');
const router = express.Router();
const CategoryServices = require('../services/category.service');
const service = new CategoryServices();
const validatorHandler = require('../middlewares/validatorHandler');
const {createCategorySchema,updateCategorySchema,getCategorySchema,deleteCategorySchema} = require('../schemas/category.dto');
//query params
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
validatorHandler(getCategorySchema,'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});
router.post('/',
validatorHandler(createCategorySchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
validatorHandler(getCategorySchema,'params'),
validatorHandler(updateCategorySchema,'body'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newCategoryData = await service.update(id, body);
    res.json(newCategoryData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
validatorHandler(deleteCategorySchema,'params'),
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

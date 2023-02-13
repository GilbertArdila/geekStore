const express =require('express');
const router = express.Router();
const CategoryServices = require('../services/category.service');
const service = new CategoryServices();

//query params
router.get('/',async(req,res) => {
  const categories =await service.find()
  res.json(categories);
});

router.get('/:id',async(req,res) => {
  const {id} = req.params;
 const category =await service.findOne(id);
  res.json(category);
});
router.post('/',async (req, res) => {
  const body = req.body;
  const newCategory =await service.create(body);
  res.json(newCategory);


});

router.patch('/:id',async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const newCategoryData =await service.update(id,body);
  res.json(newCategoryData)
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  const response =await service.delete(id);
  res.json(response);
});

module.exports = router;

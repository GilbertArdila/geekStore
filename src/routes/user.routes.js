const express = require('express');
const router = express.Router();
const UserServices = require('../services/user.service');

const service = new UserServices();
//query params
router.get('/',async (req,res) => {
  const users = await service.find()
  res.json(users);
});

router.get('/:id',async (req,res) => {
  const {id} = req.params;
 const user =await  service.findOne(id);
  res.json(user);
});

router.post('/',async (req, res) => {
  const body = req.body;
  const newUser =await service.create(body);
  res.json(newUser);


});

router.patch('/:id',async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const newUserData =await service.update(id,body);
  res.json(newUserData)
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  const response =await service.delete(id);
  res.json(response);
});


module.exports = router;

const express = require('express');
const passport = require('passport')
const ckeckRoles = require('../middlewares/auth.handler');

const router = express.Router();
const UserServices = require('../services/user.service');
const validatorHandler = require('../middlewares/validatorHandler');
const {getUserSchema,updateUserSchema,createUserSchema,deleteUserSchema} = require('../schemas/user.dto');

const service = new UserServices();
//query params
router.get('/',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
 async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(getUserSchema,'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(createUserSchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(getUserSchema,'params'),
validatorHandler(updateUserSchema,'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const newUserData = await service.update(id, body);
    res.json(newUserData);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
passport.authenticate('jwt',{session:false}),
ckeckRoles('admin','superAdmin'),
validatorHandler(deleteUserSchema,'params'),
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

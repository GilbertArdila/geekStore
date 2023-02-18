const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthServices = require('../services/auth.service');
const service = new AuthServices();

router.post(
  '/login',
  //autenticamos si el usuario y login son correctos
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/recovery',
  async (req, res, next) => {
    try {
      //este usuario nos lo envia el utils/auth/strategies/local.Strategy en el done si todo sale bien
      const {email} = req.body;
      const response = await service.sendRecoveryPassword(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/new-password',
  async (req, res, next) => {
    try {
      //este usuario nos lo envia el utils/auth/strategies/local.Strategy en el done si todo sale bien
      const {token,newPassword} = req.body;
      const response = await service.changePassword(token,newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

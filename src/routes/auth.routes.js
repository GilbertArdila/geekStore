const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
router.post(
  '/login',
  //autenticamos si el usuario y login son correctos
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      //este usuario nos lo envia el utils/auth/strategies/local.Strategy en el done si todo sale bien
      const user = req.user;
      //creamos el payload
      const payload = {
        sub: user.id,
        role: user.role
      };
      //traemos el secret
      const secret = config.jwtSecret;
      //creamos el token
     const token = jwt.sign(payload,secret);
     //retornamos el user y el token
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

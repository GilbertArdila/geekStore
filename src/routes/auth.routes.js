const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login',
passport.authenticate('local',{session:false}),
 async (req, res, next) => {
  try {
    //este usuario nos lo envia el utils/auth/strategies/local.Strategy en el done si todo sale bien
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});


module.exports = router;

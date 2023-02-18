const boom = require('@hapi/boom');

//el payload está en req.user porque la estrategia de autenticación jwt nos lo envia
const ckeckRoles = (...roles) => {
  return (req,res,next) => {
    const user = req.user;
  if(roles.includes(user.role)){
    next()
  }else{
    next(boom.unauthorized('User role unauthorized'))
  }
  }

}

module.exports = ckeckRoles;

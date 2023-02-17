const { Strategy } = require('passport-local');
const UserServices = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserServices();
const localStrategy = new Strategy({
  //el nombre como se hará el require desde el frontend o postman o lo que sea
  usernameField:'email',
  passwordField:'password'
},
  async (email, password, done) => {
  try {
    //buscamos el usuario
    const user = await service.findByEmail(email);
    //si no existe el usuario
    if (!user) {
       done(boom.unauthorized('Email not valid'),false);
    }
    //verificamos el password del usuario
    const isMatch = await bcrypt.compare(password,user.password);
    //si no es correcto el password
    if(! isMatch){
      done(boom.unauthorized('Password not valid'),false);
    }
    //no retornamos el password para evitar mostralo en la respuesta
    delete user.dataValues.password;
    //enviamos el usuario al auth.routes
    done(null,user);

  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;

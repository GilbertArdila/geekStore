const { Strategy } = require('passport-local');
const AuthServices = require('../../../services/auth.service');

const service = new AuthServices();
const localStrategy = new Strategy({
  //el nombre como se hará el require desde el frontend o postman o lo que sea
  usernameField:'email',
  passwordField:'password'
},
  async (email, password, done) => {
  try {
    const user = await service.getUser(email,password);
    //retornamos el usuario si se encontró
    done(null,user)

  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;

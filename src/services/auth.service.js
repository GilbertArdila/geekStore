const UserServices = require('../services/user.service');
const service = new UserServices();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');
const nodemailer = require('nodemailer');



class AuthServices{
 async getUser(email,password) {
  //buscamos el usuario
  const user = await service.findByEmail(email);
  //si no existe el usuario
  if (!user) {
     throw boom.unauthorized('Email not valid');
  }
  //verificamos el password del usuario
  const isMatch = await bcrypt.compare(password,user.password);
  //si no es correcto el password
  if(! isMatch){
    throw boom.unauthorized('Password not valid');
  }
  //no retornamos el password para evitar mostralo en la respuesta
  delete user.dataValues.password;
  delete user.dataValues.recoveryToken;
  return user;

 };

  signToken(user){
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
return {
  user,
  token
};
 };


async sendRecoveryPassword(email){
   //buscamos el usuario
   const user = await service.findByEmail(email);
   //si no existe el usuario
   if (!user) {
      throw boom.unauthorized('Email unauthorized');
   }
   //creamos el payload con el id del usuario
   const payload = {sub: user.id}
   //generamos un token para la recuperación de contraseña
   const token = jwt.sign(payload,config.jwtRecoverySecret,{expiresIn: '15min'});
   //creamos el link hacia el frontend usualmente
   const link = `http://myFrontend.com/recovery?token=${token}`;
   //actualizamos el campo recovery token en la db
   await service.update(user.id,{recoveryToken:token})
   const mail = {
    from: config.smtpAdress,
    to: `${user.email}`,
    subject: "Recovery password",
    html: `<p>Follow this link to recover your password</p><a>${link}</a>`,
  };
   const response = await this.sendMail(mail);
   return response;
;}

 async sendMail(infoMail){

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.smtpAdress,
      pass: config.smtpPassword,
    },
  });
  await transporter.sendMail(infoMail);
  return {message:'Recovery mail has been send'}

 }

 async changePassword(token, newPassword) {
  try {
    //el payload nos envia el sub que contiene el id del usuario, al hacer el verify si todo está bien nos retorna ese payload
    const payload = jwt.verify(token,config.jwtRecoverySecret);
    //obtenemos el usuario
    const user = await service.findOne(payload.sub);
    //verificamos el token
    if (user.recoveryToken !== token) {
      throw boom.unauthorized('Token not valid');
    }
    //encriptamos el nuevo password
    const hash = await bcrypt.hash(newPassword, 10);
    //hacemos null el token en l adb para evitar que se vuelva a usar y cambiamos el password
    await service.update(user.id, {recoveryToken: null, password: hash});
    return { message: 'password has been updated' };
  } catch (error) {
    throw boom.unauthorized('Token has expired');
  }
}

}
module.exports = AuthServices;

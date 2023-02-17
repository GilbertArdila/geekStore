const express =require('express');
const cors = require('cors')
const routerApi = require('./src/routes');
const {errorHandler,boomErrorHandler,ormErrorHandler} = require('./src/middlewares/error.handler');
const app = express();
const port =process.env.PORT || 3000;
//para enviar información en formato json
app.use(express.json());
//cors
const whiteList = ['http://localhost:8080','https://myFrontendApp.com'];
const options = {
  origin: (origin,callback) => {
     if(whiteList.includes(origin) || !origin){
      callback(null,true)
     }else{
        callback(new Error('Cors error, user not allowed'))
     }
  }
}
app.use(cors(options));

//ejecutamos las estrategias
require('./src/utils/auth');

//llamamos la función del routes/index.js y le pasamos app
routerApi(app);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);



app.get('/',(req,res) => {
  res.send('hello root');
});



app.listen(port, () => {
  console.log('port '+port);
});

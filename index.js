const express =require('express');
const routerApi = require('./src/routes');
const {errorHandler,boomErrorHandler} = require('./src/middlewares/error.handler');
const app = express();
const port = 3000;
//para enviar información en formato json
app.use(express.json());

//llamamos la función del routes/index.js y le pasamos app
routerApi(app);
app.use(boomErrorHandler)
app.use(errorHandler);



app.get('/',(req,res) => {
  res.send('hello root');
});



app.listen(port, () => {
  console.log('port '+port);
});

const express =require('express');
const routerApi = require('./src/routes');
const app = express();
const port = 3000;

//llamamos la función del routes/index.js y le pasamos app
routerApi(app);


app.get('/',(req,res) => {
  res.send('hello root');
});



app.listen(port, () => {
  console.log('port '+port);
});

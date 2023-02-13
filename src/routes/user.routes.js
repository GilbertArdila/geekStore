const express =require('express');
const router = express.Router();


//query params
router.get('/',(req,res) => {
  const {limit,offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
    offset
  });
  }
  res.send('sin parametros');
});
router.get('/:id',(req,res) => {
  const {id} = req.params;
  res.json({id});
});

module.exports = router;

const express = require('express');
const router = express.Router();

//query params
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  }
  res.send('sin parametros');
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body,
  });


});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body + id,
  });


});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  res.json({
    message: 'done',
    data:id
  });


});

module.exports = router;

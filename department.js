const express = require('express');

const router = express.Router();

router.get('/all', (req, res) => {
  res.send('Birds home page');
});

router.get('/:id', (req, res) => {
  res.send(`trying to access ${req.params.id}`);
});

router.post('/new', (req, res) => {
  res.send('trying to add a new department');
});

router.post('/:id/modify', (req, res) => {
  res.send(`trying to modify department ${req.params.id}`);
});

module.exports = router;

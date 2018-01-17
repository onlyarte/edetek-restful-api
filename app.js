const express = require('express');
const department = require('./department');

const app = express();

app.use('/department', department);

app.listen(3000, () => {
  console.log('App has started at http://localhost:3000/');
});

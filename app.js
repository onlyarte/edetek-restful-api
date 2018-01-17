const express = require('express');
const bodyParser = require('body-parser');
const department = require('./department');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/department', department);

app.listen(3000, () => {
  console.log('App has started at http://localhost:3000/');
});

const express = require('express');

require('dotenv').config();

const path = require('path');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/build')))

app.get('/', (req, res) => {
  //  res.send('Hello World');
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = {
  app
}
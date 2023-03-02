const express = require('express');
const bodyParser = require('body-parser');
require('./database/connect');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
const email = require('./routes/email');

app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/send', email);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

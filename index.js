const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./database/connect');
require('./crons/first-cron');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const passport = require('./passport-strategies/bearer');

const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
const email = require('./routes/email');
const upload = require('./routes/uploads');
const register = require('./routes/register'); 

app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/send', email);
app.use('/uploads', upload);
app.use('/', register);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

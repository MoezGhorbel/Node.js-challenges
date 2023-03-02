const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/todos')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB', err));

module.exports = mongoose;
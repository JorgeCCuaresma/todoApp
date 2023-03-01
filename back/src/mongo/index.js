const mongoose = require('mongoose');

mongoose.connect('mongodb://todoapi:apicuaresma@localhost:27025/app?authSource=admin');


const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

module.exports = mongo;
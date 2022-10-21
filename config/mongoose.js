const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todos");

const db = mongoose.connection;

db.on('error', console.error.bind( console, "Error in connnecting to mondodb"));

db.once('open', function(){
    console.log("connected to database");
});

module.exports = db;
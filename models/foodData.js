const mongoose  = require('mongoose')

const schema = new mongoose.Schema({});

const Food_Data = new mongoose.model('food_items', schema);


module.exports =Food_Data
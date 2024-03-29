const mongoose  = require('mongoose')

const catSchema = new mongoose.Schema();

const Food_Category = new mongoose.model('food_categories', catSchema);


module.exports = Food_Category;
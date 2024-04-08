const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE)
     .then( ()=> console.log('Connection Successful.......'))
     .catch(()=> console.log('Connection Failed.'))

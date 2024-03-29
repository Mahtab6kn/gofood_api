const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://mahtab6kn:${process.env.PASS}@cluster0.suqcyrt.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0`)
     .then( ()=> console.log('Connection Successful.......'))
     .catch(()=> console.log('Connection Failed.'))


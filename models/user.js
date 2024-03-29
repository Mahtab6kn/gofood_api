const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    address:{
        type:String,
        required:true,
        minLength:5
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    
}, {timestamps:true});

userSchema.pre('save', async function(next){
     if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
     }
     next();
});

const User = new mongoose.model('user', userSchema)

module.exports = User;

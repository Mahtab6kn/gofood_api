const User = require('../models/user')
const bcrypt = require('bcrypt');
     
        //    Signup Controller 
const signupData = async (req, res)=>{
     try{
        const user = new User(req.body)
        const userData = await user.save();
        res.send({success:true, data:userData});

     }
     catch(e){
        res.send({Error: e})
     }
}

const loginData = async (req , res)=>{
    try{
         const {email, password} = req.body;
         console.log(email)
         
         if(email && password){

            const user = await User.findOne({email});
            console.log({user:user})
            if(user){
                const match =await bcrypt.compare(password , user.password);
                console.log({Match:match})
                if(match){
                    res.send({ success:true, user})
                    // res.send({login:success, user:user})
                }
                else{
                    res.status(404).send({message:'Password is incorrect'})
                }
            }
            else{
                res.status(404).send({message:"User not Exist"})
            }

         }
         else{
            res.status(404).send('Email and Password both are required')
         }
    }
    catch(e){
        res.send({Error:e})
    }
}

module.exports = {
    signupData,
    loginData,
}
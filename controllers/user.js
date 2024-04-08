const User = require('../models/user')
const bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

//    Signup Controller 
const signupData = async (req, res) => {
    try {
        const user = new User(req.body)
        const userData = await user.save();
        res.send({ success: true, data: userData });

    }
    catch (e) {
        res.send({ Error: e })
    }
}

const loginData = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)

        if (email && password) {

            const user = await User.findOne({ email });
            console.log({ user: user })
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                console.log({ Match: match })
                if (match) {
                    res.send({ success: true, user })
                    // res.send({login:success, user:user})
                }
                else {
                    res.status(404).send({ message: 'Password is incorrect' })
                }
            }
            else {
                res.status(404).send({ message: "User not Exist" })
            }

        }
        else {
            res.status(404).send('Email and Password both are required')
        }
    }
    catch (e) {
        res.send({ Error: e })
    }
}
// Forgot Password

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not Registered' })
        }
        const token = jwt.sign({ _id: user._id }, process.env.KEY, { expiresIn: '5m' });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.Pass
            }
        });

        var mailOptions = {
            from: 'mahtab6kn@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `https://mahtab-gofood.netlify.app/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.json({ status: true, message: "email sent" })
            }
        });

    }
    catch (e) {
        console.log(e)
    }
}

//Reset Password

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decode = await jwt.verify(token, process.env.KEY);
        console.log(decode)
        const id = decode._id;
        const hashPassword = await bcrypt.hash(password, 12);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
        return res.json({ status: true, message: 'Upadate Password' })
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    signupData,
    loginData,
    forgotPassword,
    resetPassword
}
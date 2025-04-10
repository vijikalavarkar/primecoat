const User = require("../models/auth-user")

const home = async (req, res) => {
    try{
        res.status(200).json({message: 'Welcome to the home page !!!'})
    }catch(error){
        console.log(error)
    }
}

const register = async (req, res) => {
    try{

        const { firstname, lastname, email, phone, password, cpassword } = req.body;

        const emailExists = await User.findOne({email:email})

        if(emailExists){
            return res.status(400).json({error: 'Email already exists !!'})
        }

        if(password !== cpassword){
            return res.status(400).json({error: 'Password and confirm password do not match !!'})
        }

        const userCreated = await User.create({ firstname, lastname, email, phone, password, cpassword })

        res.status(200).json({message: 'User Registered Successfully', token: await userCreated.generateAuthToken(), userId: userCreated._id.toString()})

    }catch(error){
        console.log(error)
    }
}

const login = async (req, res) => {
    try{
        res.status(200).json({message: 'Welcome to the login page !!!'})
    }catch(error){
        console.log(error)
    }
}

const service = async (req, res) => {
    try{
        res.status(200).json({message: 'Welcome to the service page !!!'})
    }catch(error){
        console.log(error)
    }
}

const about = async (req, res) => {
    try{
        res.status(200).json({message: 'Welcome to the about page !!!'})
    }catch(error){
        console.log(error)
    }
}

const contact = async (req, res) => {
    try{
        res.status(200).json({message: 'Welcome to the contact page !!!'})
    }catch(error){
        console.log(error)
    }
}
module.exports = { home, register, login,service, about, contact }
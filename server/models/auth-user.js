const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


// Hash password before saving to the database
userSchema.pre('save', async function(next){

    const user = this;

    if(!user.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const hashedCpassword = await bcrypt.hash(user.cpassword, salt);
    user.cpassword = hashedCpassword;

})

// Generate auth token

userSchema.methods.generateAuthToken = async function(){
    try{
        return jwt.sign({ userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h'})
    }catch(error){
        console.log(error)
    }
}


const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');


const userSchema = new mongoose.Schema(
  {
    firstName:{
      type: String,
      require: [true, "firstName is required"],
      minlength: [3, "must be at least 3 charcter"],
      maxLength: [18, "Too long firstName "]
    },
    lastName:{
      type: String,
      require: [true, "lastName is required"],
      minlength: [3, "must be at least 3 charcter"],
      maxLength: [18, "Too long LastName "]
    },
    Email:{
      type: String,
      require: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      lowercase: true,
      validate: [validator.isEmail, "sorry this is not a email"]
    },
    phoneNumber:{
      type: Number,
    },
    gender:{
      type: String,
      require: [true, "gender is required"],
      minlength: [4, "must be at least 4 charcter"],
      maxlength: [6, "Too long gender only male or female"],
      enum:["male", "female"],
      lowercase: true
    },
    password:{
      type: String,
      require: [true, "password is required"],
      minlength: [4, "Password must be at least 4 charcter"],
    },
    passwordConfirm:{
      type: String,
      require: [true, "passwordConfirmation is required"],
      minlength: [4, "Password must be at least 4 charcter"],
      maxlength: [15, "Maximum length is 15 charcters"]
    },
    token:{
      type: String,
    },
    role:{
      type: String,
      enum: [userRoles.Admin, userRoles.Manager, userRoles.User],
      default: userRoles.User
    },
    avatar:{
      type: String,
      default: 'uploads/hh3.jpg'
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('User', userSchema);
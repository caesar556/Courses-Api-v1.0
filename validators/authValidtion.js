const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');


const registerValidtion = () => {
  registerSchema = [
    check('firstName')
      .notEmpty()
      .withMessage("FirstName is required")
      .isLength({min: 3})
      .withMessage("FirstName must be at least 3 charcter")
      .isLength({max: 18})
      .withMessage("Too long FirstName"),
    check('lastName')
      .notEmpty()
      .withMessage("LastName is required")
      .isLength({min: 3})
      .withMessage("LastName must be at least 3 charcter")
      .isLength({max: 18})
      .withMessage("Too long LastName"),
    check('Email')
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    check('phoneNumber')
      .optional()
      .isMobilePhone(['ar-EG', 'ar-SA'])
      .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
    check('gender')
      .notEmpty()
      .withMessage("gender is required")
      .isLength({min: 4})
      .withMessage("gender must be at least 4 charcter")
      .isLength({max: 6})
      .withMessage("Too long gender only [male or female]"),
    check('password')
      .notEmpty()
      .withMessage("password is required")
      .isLength({min: 4})
      .withMessage("password must be at least 4 charcter")
      .isLength({max: 15})
      .withMessage("Too long password")
      .custom((password, { req }) => {
        if(password !== req.body.passwordConfirm){
          throw new Error('Password Confirmation incorrect');
        }
        return true;
      }),
    check('passwordConfirm')
      .notEmpty()
      .withMessage("passwordConfirm is required")
      .isLength({min: 4})
      .withMessage("password must be at least 4 charcter")
      .isLength({max: 15})
      .withMessage("Too long password"),
      
    check('role').optional(),
    check('avatar').optional(),  
    
    validatorMiddleware,
  ];
  return registerSchema;
}

const loginValidtion = () => {
  loginSchema = [
    check('Email')
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    check('password')
      .notEmpty()
      .withMessage("password is required")
      .isLength({min: 4})
      .withMessage("password must be at least 4 charcter")
      .isLength({max: 15})
      .withMessage("Too long password"),
      
    validatorMiddleware,
  ];
  return loginSchema;
}

module.exports = {
  registerValidtion,
  loginValidtion
}
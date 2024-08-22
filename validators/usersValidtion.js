const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');

const updateUserValidator = () => {
  const updateUserSchema = [
    check('id')
      .isMongoId()
      .withMessage('Invalid ID formate'),
    check('Email')
      .optional()
      .isEmail()
      .withMessage("Invalid email address"),
    check('phoneNumber')
      .optional()
      .isMobilePhone(['ar-EG', 'ar-SA'])
      .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),  
    check('password')
      .optional()
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
      .optional()
      .isLength({min: 4})
      .withMessage("password must be at least 4 charcter")
      .isLength({max: 15})
      .withMessage("Too long password"),  
      
    validatorMiddleware,
  ];
  return updateUserSchema;
}

const getUserValidator = () => {
  const getUserSchema = [
    check('id')
      .isMongoId()
      .withMessage('Invalid ID formate'),
    validatorMiddleware,
  ];
  return getUserSchema;
}

const deleteUserValidator = () => {
  const deleteUserSchema = [
    check('id')
      .isMongoId()
      .withMessage('Invalid ID formate'),
    validatorMiddleware,
  ];
  return deleteUserSchema;
}


module.exports = {
  updateUserValidator,
  getUserValidator,
  deleteUserValidator
}
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');

const createCourseValidator = () => {
  const createCourseSchema = [
    check('title')
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 4 })
      .withMessage("Title must be at least 4 characters")
      .isLength({ max: 25 })
      .withMessage("Title must be at most 25 characters"),
    
    check('price')  
      .notEmpty()
      .withMessage("Price is required")
      .isInt()
      .withMessage("Must be a Number")
      .isLength({min: 3})
      .withMessage("Price must be at least 3 characters ")
      .isLength({max: 10})
      .withMessage("Too long Price"),

    check('description')
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 15 })
      .withMessage("Description must be at least 20 characters")
      .isLength({ max: 100 })
      .withMessage("Description must be at most 130 characters"),

    check('ratingsAverage')
      .optional()
      .isFloat({ min: 1, max: 5 })
      .withMessage('Rating must be between 1.0 and 5.0'),
    
    check('category')
      .notEmpty()
      .withMessage("Category is required")
      .isLength({ min: 4 })
      .withMessage("Category must be at least 4 characters")
      .isLength({ max: 20 })
      .withMessage("Category must be at most 20 characters"),

    check('priceAfterDiscount')
      .optional()
      .isFloat()
      .withMessage("Price after discount must be a number")
      .isLength({ min: 3, max: 10 })
      .withMessage("Price after discount must be between 3 and 10 characters"),
    
    validatorMiddleware,
  ];
  
  return createCourseSchema;
}

const updateCourseValidator = () => {
  updateCourseSchema = [
    check('id')
      .isMongoId()
      .withMessage('Invalid ID formate'),
    check('title')
      .optional()
      .isLength({ min: 4 })
      .withMessage("Title must be at least 4 characters")
      .isLength({ max: 25 })
      .withMessage("Title must be at most 25 characters"),
    check('price')
      .optional()
      .isInt()
      .withMessage("Must be a Number")
      .isLength({min: 3})
      .withMessage("Price must be at least 3 characters ")
      .isLength({max: 10})
      .withMessage("Too long Price"),
    check('category')
      .optional()
      .isLength({ min: 4 })
      .withMessage("Category must be at least 4 characters")
      .isLength({ max: 20 })
      .withMessage("Category must be at most 20 characters"), 
    check('description')
      .optional()
      .isLength({ min: 15 })
      .withMessage("Description must be at least 20 characters")
      .isLength({ max: 100 })
      .withMessage("Description must be at most 130 characters"),  
      
    validatorMiddleware,
  ];
  return updateCourseSchema;
}

const deleteCourseValidator = () => {
  deleteCourseSchema = [
    check('id')
      .isMongoId()
      .withMessage('Invalid ID formate'),
      
    validatorMiddleware,
  ];
  return deleteCourseSchema;
}

const singleCourseValidator = () => {
  singleCourseSchema = [
    check('id')
      .isMongoId()
      .withMessage('Invalid ID formate'),
      
    validatorMiddleware,
  ];
  return singleCourseSchema;
}

module.exports = {
  createCourseValidator,
  updateCourseValidator,
  deleteCourseValidator,
  singleCourseValidator
};

const express = require('express');
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middleware/VerifyToken');
const allowedTo = require('../middleware/allowedTo');
const userRoles = require('../utils/userRoles');
const {
  registerValidtion,
  loginValidtion
} = require('../validators/authValidtion');
const {
  updateUserValidator,
  getUserValidator,
  deleteUserValidator
} = require('../validators/usersValidtion');
const {diskStorage, fileFilter} = require('../utils/uploadFile');
const router = express.Router();
const multer = require('multer');

//    file upload
const upload = multer({ 
  storage: diskStorage,
  fileFilter
})
//     Routes
router.route('/')
    .get(
      /*verifyToken,
      allowedTo(userRoles.Admin, userRoles.Manager),*/
      usersController.getAllUsers
    ) 
    
router.route('/:id')
    .get(
      /*verifyToken,
      allowedTo(userRoles.Admin, userRoles.Manager),*/
      getUserValidator(),
      usersController.getSingleUser
    )
    .delete(
      /*verifyToken,
      allowedTo(userRoles.Admin, userRoles.Manager),*/
      deleteUserValidator(),
      usersController.deleteUser
    )
    .patch(
      updateUserValidator(),
      usersController.updateUser
    )

router.route('/register')
    .post(
      upload.single('avatar'),
      registerValidtion(),
      usersController.register
    ) 

router.route('/login')
    .post(
      loginValidtion(),
      usersController.login
    )
    
module.exports = router;
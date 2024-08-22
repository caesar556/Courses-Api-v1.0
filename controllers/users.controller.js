const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const generateToken = require('../utils/generateToken');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./factory.controller');

// @desc    Get All users in Database
// @route   Get /api/users
// @access  private["Admin", "Manager"]
const getAllUsers = asyncWrapper( 
  async (req, res) => {
    const documentsCount = await User.countDocuments();
    const apiFeatures = new ApiFeatures(User.find(), req.query)
      .limitFields()
      .filter()
      .sort()
      .paginate(documentsCount)
    
    const {mongoQuery, paginationResult} = apiFeatures;
    const users = await mongoQuery;
    res.json({
      status: httpStatusText.SUCCESS,
      data: {
        results: documentsCount,
        paginationResult,
        users: users
      }
    })
})
// @desc    register user in Database
// @route   post /api/users
// @access  Public
const register = asyncWrapper(
  async (req, res, next) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      gender,
      Email,
      password,
      role
    } = req.body;

    const oldUser = await User.findOne({Email: Email});
    if(oldUser){
      const error = appError.create("The user already exists", 400, httpStatusText.FAIL);
      return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      firstName,
      lastName,
      Email,
      gender,
      phoneNumber,
      password: hashedPassword,
      role,
      avatar: req.file.filename
    })
    
    const token = await generateToken({Email: newUser.Email, id: newUser._id, role: newUser.role});
    newUser.token = token;
    
    await newUser.save()
    res.status(201).json({ status: httpStatusText.SUCCESS, data: {user:newUser} })
  })
// @desc    login user in Database
// @route   post /api/users
// @access  Private[User, Admin, Manager]
const login = asyncWrapper(
  async (req, res, next) => {
    const {Email, password} = req.body;
    const user = await User.findOne({Email: Email});
    if(!user){
      const error = appError.create('user not found', 404, httpStatusText.FAIL)
      return next(error);
    }
    
    const matchedPassword = await bcrypt.compare(password, user.password);
    
    if(user && matchedPassword){
      const token = await generateToken({Email: user.Email, id: user._id, role: user.role});
      return res.json({ status: httpStatusText.SUCCESS, data: {token} })
    }else{
      const error = appError.create('something wrong in Email and password', 500, httpStatusText.ERROR)
      return next(error);
    }
  }
)
// @desc    Delete one user by Id in Database
// @route   delete /api/users/id
// @access  private["Admin", "Manager"]
const deleteUser = factory.deleteOne(User)
// @desc    update one user by Id in Database
// @route   patch /api/users/id
// @access  private["Admin", "Manager"]
const updateUser = factory.updateOne(User)
// @desc    Get Single user in Database
// @route   Get /api/users/id
// @access  private["Admin", "Manager"]
const getSingleUser = factory.getSingleOne(User)


module.exports = {
  getAllUsers,
  deleteUser,
  register,
  updateUser,
  getSingleUser,
  login
}
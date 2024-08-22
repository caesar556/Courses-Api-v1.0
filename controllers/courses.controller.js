const Course  = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const asyncWrapper = require('../middleware/asyncWrapper');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./factory.controller');

// @desc    All courses in Database
// @route   Get /api
// @access  Public
const getAllCourses = asyncWrapper(
  async (req, res) => {

    const documentsCount = await Course.countDocuments();
    const apiFeatures = new ApiFeatures(Course.find(), req.query)
      .sort()
      .filter()
      .limitFields()
      .paginate(documentsCount)
    
    const {mongoQuery, paginationResult} = apiFeatures;
    const courses = await mongoQuery;
    res.json({
      status: httpStatusText.SUCCESS,
      data: {
        results: documentsCount,
        paginationResult,
        courses: courses
      }
    })
    
})

// @desc    Create new course in Database
// @route   Post /api
// @access  private[Admin, Manager]  
const createCourse = asyncWrapper(
  async (req, res, next) => {
    const {title, description} = req.body;
    const existCourse = await Course.findOne({title: title, description: description});
    if(existCourse){
      const error = appError.create("The information of course already exists!", 400, httpStatusText.FAIL);
      return next(error);
    }
    const newCourse = new Course({
      ...req.body,
      imageCover: req.file.filename
    });
    
    await newCourse.save()
    res.status(201).json({ status: httpStatusText.SUCCESS, data: {course:newCourse} })
})
// @desc    get single course in Database [By course Id ]
// @route   Get /api
// @access  Public
const getSingleCourse = factory.getSingleOne(Course)
// @desc    update course in Database
// @route   update /api
// @access  private[Admin, Manager]
const updateCourse = factory.updateOne(Course)
// @desc    Delete course in Database
// @route   delete /api
// @access  private[Admin, Manager]
const deleteCourse = factory.deleteOne(Course)

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
}
const express = require('express');
const coursesController = require('../controllers/courses.controller');
const verifyToken = require('../middleware/VerifyToken');
const allowedTo = require('../middleware/allowedTo');
const userRoles = require('../utils/userRoles');
const {diskStorage, fileFilter} = require('../utils/uploadFile');
const multer = require('multer');
const {
  createCourseValidator,
  updateCourseValidator,
  deleteCourseValidator,
  singleCourseValidator
} = require('../validators/coursesValidtor')
const router = express.Router();

//   uploadFile 
const upload = multer({ 
  storage: diskStorage,
  fileFilter
})


router.route('/')
    .get(coursesController.getAllCourses)
    .post(
      upload.single('imageCover'),
      /*verifyToken,
      allowedTo(userRoles.Admin, userRoles.Manager),*/
      createCourseValidator(),
      coursesController.createCourse
    )

router.route('/:id')
    .get(
     // singleCourseValidator,
      coursesController.getSingleCourse
    )
    .patch(
      verifyToken,
      allowedTo(userRoles.Admin, userRoles.Manager),
      updateCourseValidator(),
      coursesController.updateCourse
    )
    .delete(
      /*verifyToken,
      allowedTo(userRoles.Admin, userRoles.Manager),*/
      deleteCourseValidator(),
      coursesController.deleteCourse
    )

module.exports = router;
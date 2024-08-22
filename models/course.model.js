const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      require: [true, "title is required"],
      minLength: [4, "title must be at least 4 chracter"],
      maxLength: [25, "Too long title"]
    },
    price:{
      type: Number,
      require: [true, "price is required"],
      trim: true,
      max: [200000, 'Too long price'],
    },
    description:{
      type: String,
      require: [true, "description is required"],
      minLength: [15, "Description must be at least 20 chracter"],
      maxLength: [100, "Too long Description"]
    },
    priceAfterDiscount:{
      type: Number,
      max: [200000, 'Too long priceAfterDiscount']
    },
    category:{
      type: String,
      require: [true, "category is required"],
      minLength: [4, "category must be at least 14 chracter"],
      maxLength: [20, "Too long category"]
    },
    imageCover:{
      type: String,
      default: 'uploads/hh3.jpg'
    },
    ratingsAverage:{
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5,"Rating must be above or equal 5.0"]
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model('Course', courseSchema);
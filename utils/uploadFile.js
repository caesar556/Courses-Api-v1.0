const multer = require('multer');
const appError = require('../utils/appError');
let namePhoto = "img";

const diskStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads');
  },
  filename: function(req, file, cb){
    const ext = file.mimetype.split('/')[1];
    const fileName = `${namePhoto}-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
})

const fileFilter = (req,file,cb) => {
  const imageType = file.mimetype.split('/')[0];
  if(imageType === "image"){
    return cb(null, true)
  }else{
    return cb(appError.create("sorry this not image", 400),false);
  }
}

module.exports = {
  diskStorage,
  fileFilter,
  namePhoto
}
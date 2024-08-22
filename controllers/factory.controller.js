const asyncWrapper = require('../middleware/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

exports.deleteOne = (modal) => asyncWrapper(
  async (req, res) => {
    const { id } = req.params;
    await modal.deleteOne({_id: id });
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
  }
)

exports.updateOne = (modal) => asyncWrapper( 
  async (req, res, next)=>{
    const {id} = req.params;
    const updatedDocment = await modal.updateOne({_id: id}, {$set:{...req.body}});
    if(!updatedDocment){
      const error = appError.create("Invalid Id", 404, httpStatusText.FAIL);
      next(error);
    }
    return res.status(200).json({status: httpStatusText.SUCCESS, data: {updatedDocment: updatedDocment} });
  }
)

exports.getSingleOne = (modal) => asyncWrapper(
  async (req, res, next) => {
    const document = await modal.findById(req.params.id);
    
    if(!document){
      const error = appError.create(` document not found`, 404, httpStatusText.FAIL)
      return next(error);
    }
    res.json({status: httpStatusText.SUCCESS, data:{ Document: document} });
  }
)
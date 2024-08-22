class ApiFeatures {
  constructor(mongoQuery, queryString) {
    this.mongoQuery = mongoQuery;
    this.queryString = queryString;
  }

  limitFields() {   // Done
  if (this.queryString && this.queryString.fields) {
    const fields = this.queryString.fields.split(',').join(' ');
    this.mongoQuery = this.mongoQuery.select(fields);
  } else {
    this.mongoQuery = this.mongoQuery.select('-password -token -__v');
  }
  return this;
 }

  sort() {      //    Done
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(' ');
      this.mongoQuery = this.mongoQuery.sort(sortBy);
    } else {
      this.mongoQuery = this.mongoQuery.sort("-createdAt");
    }
    return this;
  }

  filter() {      //   Done
    const queryObj = { ...this.queryString };
    const excludesFields = ["page", "limit", "sort", "fields"];
    excludesFields.forEach((field) => delete queryObj[field]);
    // gte/gt/lte/lt filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongoQuery = this.mongoQuery.find(JSON.parse(queryStr));
    return this;
  }
  

  
  
  paginate(countDocuments) {        //   Done
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numbersOfPages = Math.ceil(countDocuments / limit);
//      next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
//    prev page
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;

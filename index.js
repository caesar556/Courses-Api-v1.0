const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();
const dbConnection = require('./config/database');
const coursesRoute = require('./routes/courses.route');
const usersRoute = require('./routes/users.route');
const httpStatusText = require('./utils/httpStatusText');
const handleError = require('./middleware/handleError');

require('dotenv').config({path:'.env'});
app.use(cors());

dbConnection();

//    Middleware for parseing
app.use(express.json());

//     limit requests
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 50,
  message: 'Sorry server cannot handling this numbers of requests ',
});
//    limit create users in Database
const limitReq = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 5,
  skipFailedRequests: true,
  message: 'Sorry server cannot handling maximum 5 reqister requests ',
}); 

//        Middleware for requests limit
app.use('/api', apiLimiter)
app.use('/api/users/register', limitReq)
//        Middleware for routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/courses',coursesRoute)
app.use('/api/users',usersRoute)

//        Middleware for handle error of all routes
app.all('*', (req , res, next) => {
 return res.status(404).json({ status: httpStatusText.ERROR, message: "this resource is not available"});
})
//        Middleware for handle global errors
app.use(handleError);

const server = app.listen(process.env.PORT || 5001, () => {
  console.log(`listening on port ${process.env.PORT}`);
})
//  handleError outside express
process.on('unhandledRejection', (error) => {
  console.log(`UnhandledRejection Errors => ${error.name} | ${error.message}`);
  server.close(() => {
    console.log("Server Shutdown...");
    process.exit(1);
  });
})
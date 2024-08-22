const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.MONG_URL)
    .then((conn) => {
      console.log(`Database connected ${conn.connection.host}`)
    })
}

module.exports = dbConnection;
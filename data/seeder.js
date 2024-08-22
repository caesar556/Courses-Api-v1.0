const fs = require('node:fs');
require('colors');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const dbConnection = require('../config/database');

dotenv.config('../.env');

dbConnection();

const users = JSON.parse(fs.readFileSync('./'));

const insertData = async () => {
  try{
    await User.create(users);
    console.log("Data Inserted".green.inverse)
    process.exit();
  }catch((error) => {
    console.log(error.red.inverse);
  })
}

const destroyData = async () => {
  await User.deleteMany();
  console.log("Data Destroyed".green.inverse);
  process.exit()
}.catch((error) => {
  console.log(error.red.inverse);
})

if(process.argv[2] === "-i"){
  insertData();
}else if(process.argv[2] === "-d"){
  destroyData();
}else{
  console.log("invalid argv");
}
const mongoose = require('mongoose')
require('dotenv').config()

let connectionString = 'mongomongodb://localhost:27017/blog'
// let connectionString = 'mongomongodb://3b99318g20.yicp.fun:41229/blog'

// MONGODB_PORT=27017
// MONGODB_DATA_DIR=./data


console.log('mongo-connection~13 connectionString：', connectionString);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to ${connectionString}🤪`))
  .catch((err) => console.error(err))

module.exports = { mongoose }

  
const mongoose = require('mongoose')
// const { mongoPath } = require('./config.json')

const mongoPath =
  'MongoPath'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  return mongoose
}
const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const profileSchema = mongoose.Schema({
  name: reqString,
  guildId: reqString,
  userId: reqString,
  lb: reqString,
  coins: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('profilesdevs', profileSchema)
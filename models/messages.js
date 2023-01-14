const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  username: {type: String, required: true},
  messageTitle: {type: String, required: true, maxlength: 69},
  messageBody: {type: String, required: true, maxlength: 280}
}, { timestamps: true })


module.exports = mongoose.model('Messages', MessagesSchema)
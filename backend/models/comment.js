var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	comment: String,
	user: {type: String, default: "Anonymous"},
	date: {type:Date, default:Date.now}
})

module.exports = mongoose.model('Comments', CommentSchema)
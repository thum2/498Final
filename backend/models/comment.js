var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	comment: String,
	user: String,
	date: {type:Date, default:Date.now}
})

module.exports = mongoose.model('Comments', CommentSchema)
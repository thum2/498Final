var mongoose = require('mongoose')

var PetSchema = new mongoose.Schema({
	userid: {type:String, default:null},
	name: {type:String, default:null},
	location: {type:String, default:null},
	description: {type:String, default:null},
	type: {type:String, default:null},
	breed: {type:String, default:null},
	color: {type:String, default:null},
	size: {type:String, default:null},
	gender: {type:String, default:null},
	datefound: {type:Date, default:null},
	date: {type:Date, default:Date.now},
	found: {type:Boolean, default:null}
})

module.exports = mongoose.model('Pets', PetSchema)
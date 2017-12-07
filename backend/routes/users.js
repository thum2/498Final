var express = require('express'),
	router = express.Router(),
	user = require('../models/user');

router.get('/', function(req, res){
	let query = user.find({})

	query.exec(function(err, users){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			});
		}

		else{
			if(users === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				})
			}
			else{
				res.status(200).send({
					message: 'Results Found',
					data: users
				});
			}
		}	
	});	
})

module.exports = router;
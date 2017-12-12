var express = require('express'),
	router = express.Router(),
	user = require('../models/user'),
	ObjectId = require('mongodb').ObjectID;

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

router.get('/notifications', function(req, res) {
	var uId = ObjectId("" + req.session.passport.user);
	user.findOne({"_id": uId}, function(err, user) {
		if(err){
			res.status(500).send({
				message: err,
				data: []
			});
		} else{
			if(user === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				});
			}
			else{
				// console.log(user.notifications);
				res.status(200).send({
					message: 'Results Found',
					data: user.notifications
				});
			}
		}
	});
});

router.post('/notifications', function(req, res) {
	console.log(req.body);
	user.findOne({"email": req.body.recommendId }, function(err, user) {
		if(err) {
			console.log(err);
		} else {
			if(user === null) {
				console.log("User does not exist");
				res.send({message: "User does not exist"})
			} else {
				if(user.notifications.indexOf(req.body.petId) === -1) {
					console.log(user);
					console.log(req.body.petId);
					user.notifications.push(req.body.petId);
					user.save();
					res.send({message: "Your recommendation has been sent to " + user.email + ". Thank You!"})
				} else {
					console.log("Already notified user of this post");
					res.send({message:"You have already notified " + user.email + " of this post"})
				}
			}
		}
	});
});

module.exports = router;

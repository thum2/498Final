var express = require('express'),
	router = express.Router(),
	comment = require('../models/comment');

router.get('/', function(req, res){
	let query = comment.find({})

	query.exec(function(err, comments){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			});
		}

		else{
			if(comments === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				})
			}
			else{
				res.status(200).send({
					message: 'Results Found',
					data: comments
				});
			}
		}	
	});
});

router.get('/:id', function(req,res){
	
	var query = comment.findById(req.params.id)

	query.exec(function(err, oneComment){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			})
		}
		else{
			if(oneComment === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				})
			}
			else{
				res.status(200).send({
					message: 'Comment found',
					data: oneComment
				});
			}
		}
	})
})

router.post('/', function(req, res){
	var newComment = {
		comment: req.body.comment,
		user: req.body.user,
	}

	comment.create(newComment, function(err, comment){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			});
		}

		else{
			res.status(201).send({
				message: 'Comment entry created',
				data: comment
			});
		}
	});
});

module.exports = router;
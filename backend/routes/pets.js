var express = require('express'),
	router = express.Router(),
	pet = require('../models/pet');

router.get('/', function(req, res){
	let query = pet.find({})

	if(req.query.found == "true" || req.query.found == 1){
		query = pet.find({found: true})
	}

	query.exec(function(err, pets){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			});
		}

		else{
			if(pets === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				})
			}
			else{
				res.status(200).send({
					message: 'Results Found',
					data: pets
				});
			}
		}	
	});
});

router.get('/:id', function(req,res){
	
	var query = pet.findById(req.params.id)

	query.exec(function(err, onePet){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			})
		}
		else{
			if(onePet === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				})
			}
			else{
				res.status(200).send({
					message: 'User found',
					data: onePet
				});
			}
		}
	})
})


router.post('/', function(req, res){
	var newPet = {
		name: req.body.name,
		location: req.body.location,
		description: req.body.description,
		type: req.body.type,
		breed: req.body.breed,
		color: req.body.color,
		size: req.body.size,
		gender: req.body.gender,
		datefound: req.body.datefound,
		found: req.body.found
	}

	pet.create(newPet, function(err, pet){
		if(err){
			res.status(500).send({
				message: err,
				data: []
			});
		}

		else{
			res.status(201).send({
				message: 'Pet entry created',
				data: pet
			});
		}
	});
});

module.exports = router;
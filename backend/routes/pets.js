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
					message: 'Pet found',
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
		found: req.body.found,
		notes:req.body.notes,
		original_website: req.body.original_website,
		img_url: req.body.img_url
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

router.put('/:id', function(req, res){

	var updatePet = {}

	if(typeof req.body.userid !== 'undefined')
		updatePet.userid = req.body.userid
	if(typeof req.body.name !== 'undefined')
		updatePet.name = req.body.name
	if(typeof req.body.location !== 'undefined')
		updatePet.location = req.body.location
	if(typeof req.body.description !== 'undefined')
		updatePet.description= req.body.description
	if(typeof req.body.type !== 'undefined')
		updatePet.type = req.body.type
	if(typeof req.body.breed!== 'undefined')
		updatePet.breed = req.body.breed
	if(typeof req.body.color !== 'undefined')
		updatePet.color = req.body.color
	if(typeof req.body.size !== 'undefined')
		updatePet.size = req.body.size
	if(typeof req.body.gender !== 'undefined')
		updatePet.gender = req.body.gender
	if(typeof req.body.datefound !== 'undefined')
		updatePet.datefound = req.body.datefound
	if(typeof req.body.date !== 'undefined')
		updatePet.date = req.body.date
	if(typeof req.body.found !== 'undefined')
		updatePet.found = req.body.found
	if(typeof req.body.comments !== 'undefined')
		updatePet.comments = req.body.comments
	if(typeof req.body.notes !== 'undefined')
		updatePet.notes = req.body.found
	if(typeof req.body.original_website !== 'undefined')
		updatePet.original_website = req.body.original_website
	if(typeof req.body.img_url !== 'undefined')
		updatePet.img_url = req.body.img_url




	console.log(updatePet)
	pet.findByIdAndUpdate(req.params.id, updatePet, {new: true},function(err, pet){
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		}
		else{
			if(pet === null){
				res.status(404).send({
					message: 'Resource not found',
					data: []
				})
			}
			else{
				res.status(200).send({
					message: 'Pet updated',
					data: pet
				});
			}
		}
	})
});

module.exports = router;

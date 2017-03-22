//To create a new route, follow these easy steps.
	//1. Create a new route file (search.js)
	//2. Register and use this route in the app.js file
    //3. declare the things you need for this route
var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataReader = require('../helpers/dataReader');
var filterFunctions = require('../helpers/filterFunctions');
var db = require('../helpers/db');






router.post('/search', function(req, res, next) {


	//collect post data
	var postData = {
		state: req.body.state,
		status: req.body.status
	};

	//lookup the state's full name and store it on the post data object
	postData.stateFullName = filterFunctions.getFullStateName(postData.state).toLowerCase();


	// get the database collection 
	db.get().collection('landfilldata', function (err, collection) {


		function renderPage(results){

			console.log(results);
			res.render(results);
			res.render('pages/results', {
				clientResults: results,
				clientCriteria: postData
			});
		};



		if (!postData.status) {

			collection.find({'State': postData.state}).toArray(function (err, results) {
				
				renderPage(results);

			});

		} else if (postData.status) {

			collection.find({'State': postData.state, 'Current Landfill Status': postData.status}).toArray(function (err, results) {
				
				renderPage(results);				

			});

			

		}


	});
	
	// Other ways to get the collection results

	// // 2
	// db.get().collection('landfilldata').find({'State': postData.state}).toArray(function (err, result) {
	// 	console.log(result);
	// });

	// // 3
	// db.get().collection('landfilldata').find({'State': postData.state}, function (err, cursor) {
	// 	console.log(cursor);
	// })

	// // 4
	// var collection = db.get().collection('landfilldata');
	// // console.log(collection);
	// var cursor = collection.find({'State': postData.state});
	// cursor.nextObject(function (err, item) {
	// 	// body...
	// });


	// // 5
	// collection.find({'State': postData.state}).toArray(function (err, searchResults) {
	// 	console.log(searchResults);
	// });

});


module.exports = router;
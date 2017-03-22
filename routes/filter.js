var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataReader = require('../helpers/dataReader');
var filterFunctions = require('../helpers/filterFunctions');
var db = require('../helpers/db');




router.post('/filter', function (req, res, next) {

	//collect filter data
	var postData = {
		yearStart: req.body.yearStart,
		yearEnd: req.body.yearEnd,
		status: req.body.status,
		state: req.body.state,
		stateFullName: req.body.stateFull
	}

	//convert year data to Integer
	var startRange = parseInt(postData.yearStart);
	var endRange = parseInt(postData.yearEnd);

	//get the collection	
	db.get().collection('landfilldata', function (err, collection) {
			
		collection.find({'State': postData.state, 'Current Landfill Status': postData.status}).toArray(function (err, filteredArray){

			filteredArray.forEach(function(item){

				item['Year Landfill Opened'] = parseInt(item['Year Landfill Opened']);
			});

			var results = filteredArray.filter(function(landfill) {
				return landfill['Year Landfill Opened'] >= startRange && landfill['Year Landfill Opened'] <= endRange;
			});


			res.render('pages/results', {
				clientResults: results,
				clientCriteria: postData
			});	

		});

	});		

	// dataReader.getData(filterAndDisplay);

	
	// function filterAndDisplay(landfillArray) {

	// 	var searchResults = filterFunctions.stateStatusFilter(landfillArray, filterData);

	// 	var filteredResults = filterFunctions.yearOpenedFilter(searchResults, filterData.yearStart, filterData.yearEnd);
		
	// 	console.log(filteredResults);
	// 	res.send(filteredResults);
	// }	
});

module.exports = router;
var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataReader = require('../helpers/dataReader');
var filterFunctions = require('../helpers/filterFunctions');
var db = require('../helpers/db');




router.post('/filter', function (req, res, next) {

	//collect filter data
	var filterData = {
		yearStart: req.body.yearStart,
		yearEnd: req.body.yearEnd,
		status: req.body.status,
		state: req.body.state
	}

	//convert year data to Integer
	var startRange = parseInt(filterData.yearStart);
	var endRange = parseInt(filterData.yearEnd);

	//get the collection	
	db.get().collection('landfilldata', function (err, collection) {
			
			collection.find({'State': filterData.state, 'Current Landfill Status': filterData.status}).toArray(function (err, results){

				results.forEach(function(item){

					item['Year Landfill Opened'] = parseInt(item['Year Landfill Opened']);
				});

				var filteredResults = results.filter(function(landfill) {
					return landfill['Year Landfill Opened'] >= startRange && landfill['Year Landfill Opened'] <= endRange;
				});


				console.log(filteredResults);
				res.send(filteredResults);					
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
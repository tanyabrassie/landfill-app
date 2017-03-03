var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataReader = require('../helpers/dataReader');
var filterFunctions = require('../helpers/filterFunctions');



router.post('/filter', function (req, res, next) {

	var filterData = {
		yearStart: req.body.yearStart,
		yearEnd: req.body.yearEnd,
		status: req.body.status,
		state: req.body.state
	}

	var startRange = parseInt(filterData.yearStart);
	var endRange = parseInt(filterData.yearEnd);

	dataReader.getData(filterAndDisplay);

	
	function filterAndDisplay(landfillArray) {

		var searchResults = filterFunctions.stateStatusFilter(landfillArray, filterData);

		var filteredResults = filterFunctions.yearOpenedFilter(searchResults, filterData.yearStart, filterData.yearEnd);
		
		console.log(filteredResults);
		res.send(filteredResults);
	}	
});

module.exports = router;
var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataReader = require('../helpers/dataReader');




router.post('/filter', function (req, res, next) {

	var filterData = {
		yearStart: req.body.yearStart,
		yearEnd: req.body.yearEnd
	}

	var startRange = parseInt(filterData.yearStart);
	var endRange = parseInt(filterData.yearEnd);

	dataReader.getData(filterByDateOpenFn);

	function filterByDateOpenFn(landfillArray) {

		var filteredResults = landfillArray.filter(function(landFill){
			return landFill['Year Landfill Opened'] >= startRange && landFill['Year Landfill Opened'] <= endRange;
		});

		console.log(filteredResults);
		res.send(filteredResults);
	}	
});

module.exports = router;
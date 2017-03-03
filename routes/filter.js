var express = require('express');
var router = express.Router();
var fs = require('fs');



router.post('/filter', function (req, res, next) {

	var filterData = {
		yearStart: req.body.yearStart,
		yearEnd: req.body.yearEnd
	}

	var startRange = parseInt(filterData.yearStart);
	var endRange = parseInt(filterData.yearEnd);

	

	console.log(filterData);

});

module.exports = router;
//To create a new route, follow these easy steps.
	//1. Create a new route file (search.js)
	//2. Register and use this route in the app.js file
    //3. declare the things you need for this route
var express = require('express');
var router = express.Router();
var fs = require('fs');



router.post('/search', function(req, res, next){
	//collect post data
	var postData = {
		state: req.body.state,
		status: req.body.status
	};


	//read data file
	fs.readFile(__dirname + '/../landfill-data.json', 'utf8', function(err,data){
  		var rawData = JSON.parse(data);

	  	//grab the rawData and reformat it
		var metaDataArray = rawData[0];
		var landfillArray = [];


		rawData.slice(1).forEach(function(landFill){
			landfillObject = {};

			landFill.forEach(function(arrayItem, i){
				landfillObject[metaDataArray[i]] = arrayItem;

			});

			landfillArray.push(landfillObject);

		});

		//filter the data based on user criteria and store them in search results
		var searchResults = landfillArray.filter(function (landFill){
		  return landFill.State == postData.state;

		});

		console.log(searchResults);
		res.send(searchResults);
		// res.render(searchResults);

	});	

});



module.exports = router;
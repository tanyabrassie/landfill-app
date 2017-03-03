var fs = require('fs');

var dataReader = {
	//the data reader function gets a callback function to use after the
	//getData function has finished. This is a place holder TBD function that is defined
	//elsewhere 
	getData: function (successCallback) {
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

			//landfillArray is ready and then passed to the
			//success callback
			successCallback(landfillArray);

		});
	}
};


module.exports = dataReader;

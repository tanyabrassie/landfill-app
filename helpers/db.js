var MongoClient = require('mongodb').MongoClient;

//create state object with DB property that is originally null. This object doesn't get exported, only the database object is exported.
//rather, the state variable is private to the database module and can only be accessed via the methods on the database object.
var state = {
	db: null 
};

//create database object with three methods: connect, get and close

var database = {

	//the connect function takes a URL and a callback. It passes this URL to the MongoClient.connect function. If the database is
	//already connected it will return the doneFn, if the database is not already connected it will connect, assign the database to
	//state.db and then run the doneFn callback.
	connect: function(url, doneFn) {
		if (state.db) {
			return doneFn(); //return so the function stops if this code runs
		}

		MongoClient.connect(url, function (err, db) {

			if (err) {
				return doneFn(err);
			}

			state.db = db;
			console.log('Woot, Mongod is rocking and rolling');
			doneFn();

		});
	},

	//this function simply returns the database
	get: function() {
		return state.db;
	},

	close: function(doneFn) {
		if (state.db) {
			state.db.close(function(err, result) {
				state.db = null;
				state.mode = null;
				doneFn(err);
			});
		}
	}
};

//export only the database object
module.exports = database;
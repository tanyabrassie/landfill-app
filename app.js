var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var dataReader = require('./helpers/dataReader');


var index = require('./routes/index');
var search = require('./routes/search');
var filter = require('./routes/filter');

var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', search);
app.use('/', filter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

// // Connection URL
// var url = 'mongodb://localhost:27017/landfilldata';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   console.log("Connected correctly to server");


//   db.collection('landfilldata').count({})
//   	.then(function(numItems) {
//   		console.log(numItems);
//   	});
//   //var collection = db.collection('landfilldata');

//   	// findDocuments(db, function() {
//    //    db.close();
//    //  });

//    // countDocuments(db, function() {
//    // 		db.close();
//    // });
 
//     // insertDocuments(db, function() {
//     //   db.close();
//     // });
// });

// var countDocuments = function(db, callback) {
// 	var collection = db.collection('landfilldata');
// 	var dbCount = collection.count({});
// 	console.log("this is working...");
// 	console.log(dbCount);
// }

// var findDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('landfilldata');
//   // Find some documents
//   // collection.remove({});
//   collection.find({}).toArray(function(err, docs) {
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }

// var insertDocuments = function(db, callback) {
 
// 	var landfillArray = [];


// 	fs.readFile(__dirname + '/landfill-data.json', 'utf8', function(err,data){
	  		
//   		var rawData = JSON.parse(data);

// 	  	//grab the rawData and reformat it
// 		var metaDataArray = rawData[0];
		

// 		rawData.slice(1).forEach(function(landFill){
// 			landfillObject = {};

// 			landFill.forEach(function(arrayItem, i){
// 				landfillObject[metaDataArray[i]] = arrayItem;

// 			});

// 			landfillArray.push(landfillObject);

// 		});

// 		var collection = db.collection('landfilldata');

// 			landfillArray.forEach(function(landfill){
// 		  	 // Insert some documents
// 			collection.insert(landfill, function(err, result) {
// 		    // assert.equal(err, null);
// 		    // assert.equal(3, result.result.n);
// 		    // assert.equal(3, result.ops.length);
// 		    console.log("Inserted 3 documents into the collection");
// 		    callback(result);
// 		  	});

// 		});

// 	});

// }

		

module.exports = app;

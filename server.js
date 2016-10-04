//Base Setup 
//======================================================

//call required packages 
var express    = require('express');	
var app		   = express();					
var bodyParser = require('body-parser');

//importing the model 
var Bear = require('./app/models/bear');

//creating DB and connection 
var mongoose = require('mongoose');
mongoose.connect('mongodb://bear:r3std3v@ds153715.mlab.com:53715/heroku_kcp6dc7q')	//db name & pw from mongolab


//config app using bodyParser() - get data from POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//set port 
var port = process.env.PORT || 8080; 




//Routes for API 
//======================================================

//get instance of express Router 
var router = express.Router(); 

//middleware use for all request 
router.use(function(req, res, next){	//declaring middleware
	console.log('something is happening in the middle - route');
	next(); //make to go to next route and don't stop here 
});


//test if route is working (GET http://localhost:8080/api)
router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to bearrest api - GET route' });
});


//on routes that end in '/bears'
//-------------------------------

router.route('/bears')

	//create a bear (POST http://localhost:8080/api/bears)
	.post(function(req,res){

		var bear = new Bear();		//create new instance of the Bear model
		bear.name = req.body.name;	//set bears name (from the request)

		//save bear and check for error 
		bear.save(function(err){
			if(err)
				res.send(err);

			res.json({ message: 'Bear created! - POST route'});
		})

	})

	//get all the bears (GET http://localhost:8080/api/bears)
	.get(function(req, res){
		Bear.find(function(err, bears){
			if(err)
				res.send(err);

			res.json(bears);
		});
	});


//on routes that end in '/bears/:bear_id'
//-------------------------------
router.route('/bears/:bear_id')
	
	//get bear with id (GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res){
		Bear.findById(req.params.bear_id, function(err, bear){
			if(err)
				res.send(err);
			res.json(bear);
		})
	})


	//update the bear with this id (PUT http://localhost:8080/api/bears_id)
	.put(function(req, res){

		//use our bear model to find wanted bear 
		Bear.findById(req.params.bear_id, function(err, bear){
			if(err)
				res.send(err);

			bear.name = req.body.name; //update the bear info


			//save the bear 
			bear.save(function(err){
				if(err)
					res.send(err);

				res.json({ message: 'Bear updated! - PUT route'});

			});
		});

	});



//Register Routes -------------------------------------
//all routes prefixed with '/api'
app.use('/api', router); 





//Start Server 
//======================================================
app.listen(port);
console.log('Magic happen on port' + port);




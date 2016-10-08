//BASE SETUP
//==============================================

var express 	= require('express');
var app 		= express();				//define app using express
var bodyParser 	= require('body-parser'); 

var Bear = require('./app/models/bear');

//create and connect DB 
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://t3nguyen:d3vt2c0@ds053166.mlab.com:53166/bear-rest')

//configure app to use bodyParser() - get data from POST 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

//set out port 
var port = process.env.PORT || 8080; 

//ROUTES FOR API
//==============================================

var router = express.Router(); //get instance of express Router 

//middleware to use for all requests
router.use(function(req, res, next){
	console.log('Something is happening - router for all requests');
	next();		//make sure to go to next route and don't stop here 
}); 


//test route (GET http://localhost:8080/api)
router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to api!! '});
});

//more routes here 




//REGISTER OUR ROUTES ---------------------------
//all routes prefixed with '/api'
app.use('/api', router);


//START THE SERVER
//==============================================
app.listen(port); 
console.log('Magic happens on port' + port);


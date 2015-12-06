var express = require('express');
var app = express();
var bodyParser = require('body-parser');	

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbURL = 'mongodb://lululululu.cloudapp.net:27017/local';
var mongoose = require('mongoose');

app.post('/',function(req,res) 
{
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error :('));

	db.once('open', function (callback) 
	{
		var rObj = {};
		rObj.address = {};
		rObj.address.building = req.body.building;
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);

		if(req.body.date!=null || req.body.grade!=null || req.body.score!=null)
		{
			rObj.grades = [];
			rObj.grades.push({date:req.body.date , grade:req.body.grade , score:req.body.score});
		}

		rObj.borough = req.body.borough;
		rObj.cuisine = req.body.cuisine;
		rObj.name = req.body.name;
		rObj.restaurant_id = req.body.restaurant_id;

		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var r = new Restaurant(rObj);
		console.log(r);
		r.save(function(err)
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
			}
       		console.log('Restaurant created!')
       		db.close();
       		//return json object here
			res.status(200).json({message: 'Insert done', _id: r._id});
    	});
    });
});


app.delete('/',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({}).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
				db.close();
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'Delete done'});
    	});
    });
});
app.delete('/restaurant_id/:id',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({restaurant_id: req.params.id}).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'Delete done', restaurant_id: req.params.id});
    	});
    });
});

app.delete('/name/:name',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({name: req.params.name}).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);

				throw err
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'Delete done', name: req.params.name});
    	});
    });
});

app.delete('/cuisine/:cuisine',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({cuisine: req.params.cuisine}).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);

				throw err
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'Delete done', cuisine: req.params.cuisine});
    	});
    });
});

app.delete('/borough/:borough',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({borough: req.params.borough}).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);

				throw err
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'Delete done', borough: req.params.borough});
    	});
    });
});
/*
app.delete('/:field/:data',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({req.params.field: req.params.data}).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', req.params.field: req.params.data});
    	});
    });
});

app.delete('/address/:field/:data',function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);

	var criteria={};
	criteria["address."+req.params.field]=req.params.data;
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria).remove(function(err) 
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
			}
       		console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', req.params.field: req.params.data});
    	});
    });
});
*/
app.get('/', function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		//var field
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);

		Restaurant.find({},function(err,results)
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
db.close();
			}
			if (results.length > 0) 
			{
				res.status(200).json(results);
db.close();
			}
			else 
			{
				res.status(200).json({message: 'No matching document'});
db.close();
			}
			db.close();
    	});
    });
});
app.get('/restaurant_id/:id', function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		//var field
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);

		Restaurant.find({restaurant_id: req.params.id},function(err,results)
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) 
			{
				res.status(200).json(results);
			}
			else 
			{
				res.status(200).json({message: 'No matching document',restaurant_id:req.params.id});
			}
			db.close();
    	});
    });
});

app.get('/:field/:value', function(req,res) 
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var field= req.params.field;
		console.log(field);
		
		if(field=="cuisine"){
		Restaurant.find({cuisine: req.params.value},function(err,results)
		{
			console.log("cuisine");
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
				db.close();
			}
			if (results.length > 0)  
			{
				res.status(200).json(results);
				db.close();
			}
			else 
			{
				
				res.status(200).json({message: 'No matching document'});
				db.close();

			}
			db.close();
    	});
	}else if(field=="name"){
		Restaurant.find({name: req.params.value},function(err,results)
		{
       		//console.log("name");
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
				db.close();
			}
			if (results.length > 0) 
			{
				res.status(200).json(results);
				db.close();
			}
			else 
			{
				res.status(200).json({message: 'No matching document'});
				db.close();


			}
			db.close();
    	});
	}else if(field=="borough"){
		Restaurant.find({borough: req.params.value},function(err,results)
		{
			console.log("borough");
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
				db.close();
			}
			if (results.length > 0) 
			{
				res.status(200).json(results);
				db.close();
			}
			else 
			{
				res.status(200).json({message: 'No matching document'});
				db.close();
	

			}
			db.close();
    	});
	}/*else if(field=="address"){
		//,address.street: req.body.street,address.zipcode: req.body.zipcode,address.lon: req.body.lon,address.lat: req.body.lat
		Restaurant.find({address.building: req.body.building},function(err,results)
		{
			console.log("address");
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
				db.close();
			}
			if (results.length > 0) 
			{
				res.status(200).json(results);
				db.close();
			}
			else 
			{
				res.status(200).json({message: 'No matching document'});
				db.close();
	

			}
			db.close();
    	});

	}*/
	else
	{

		res.status(200).json({message: 'Field is incorrect'});
		db.close();
	}
    });
});

app.put('/restaurant_id/:id/grade',function(req,res)
{
 var restaurantSchema = require('./models/restaurant');
 mongoose.connect(mongodbURL);

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'Connection Error:('));
 db.once('open', function (callback) 
 {



  var Restaurant = mongoose.model('Restaurant', restaurantSchema);
  Restaurant.findOne({restaurant_id: req.params.id},function(err,results)
  {
   
         if (err) 
         {
    res.status(500).json(err);
    throw err
   }

   if (results.length > 0) 
   {
    res.status(200).json({message: 'No matching document'});
   }
   else { 

   results.grades.push({date:req.body.date , grade:req.body.grade , score:req.body.score});
   console.log(req.body.date);
    /*
    results.grades.push(req.body.grade);
    results.grades.push(req.body.score);*/

     /*results.grades.date.push(req.body.date);
     results.grades.grade=req.body.grade;
     results.grades.score=req.body.score;
     */

     results.save(function(err)
     {
      if (err) throw err
      // console.log("yeah "+results);
     console.log(results.grades);
      console.log("Updated"); 

     });
    res.status(200).json(results);
   }
   db.close();
     });
    });
});

app.put('/restaurant_id/:id/deleteGrade',function(req,res)

{

 	var restaurantSchema = require('./models/restaurant');
 	mongoose.connect(mongodbURL);


	 var db = mongoose.connection;
	 db.on('error', console.error.bind(console, 'Connection Error:('));
	 db.once('open', function (callback) 
	 {

		  var Restaurant = mongoose.model('Restaurant', restaurantSchema);
  			Restaurant.findOne({restaurant_id: req.params.id},function(err,results)
  			{
        		 if (err) 
         		{
				    res.status(500).json(err);
				    throw err
				  }
			   if (results.length > 0) 
			   {
			    res.status(200).json({message: 'No matching document'});
			   }
			   else
			    { 
					results.grades.pop({date:req.body.date , grade:req.body.grade , score:req.body.score});
			   		console.log(req.body.date);
			     results.save(function(err)
			     {
				      if (err) throw err
				      // console.log("yeah "+results);
				     console.log(results.grades);
				      console.log("Updated"); 
			     });
			    res.status(200).json(results);
			   }
			   db.close();
			  });
	});
});
//get data by --data : update by address
app.put('/restaurant_id/:id/address',function(req,res)
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		//console.log(req.params.id);
		Restaurant.findOne({restaurant_id: req.params.id},function(err,results)
		{
       		if (err) 
       		{
				res.status(500).json(err);
				throw err
			}
			if (results == null) 
			{
				//console.log("yeah "+results);
				res.status(200).json({message: 'No matching document'});
				db.close();
			}
			
			else 
			{	
				
			results.address.building=req.body.building;
			results.address.street=req.body.street;
			results.address.zipcode=req.body.zipcode;

			results.address.coord.pop();
			results.address.coord.pop();

			results.address.coord.push(req.body.lon);
			results.address.coord.push(req.body.lat);

				results.save(function(err)
					{
						if (err) throw err
						//console.log("Updated");	

					});
				res.status(200).json({message: 'Update done'});
				//res.status(200).json(results);
				//console.log("lulul "+results);
				db.close();
			}
    	});
    });
});
//get data by --data : update by field
app.put('/restaurant_id/:id/:field/:value',function(req,res)
{
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection Error:('));
	db.once('open', function (callback) 
	{
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		//console.log(req.params.id);
		var field= req.params.field;
		console.log(field);
		
		if(field=="cuisine")
		{
			Restaurant.find({restaurant_id: req.params.id},function(err,results)
			{
				console.log("cuisine");
	       		if (err) 
	       		{
					res.status(500).json(err);
					throw err
					db.close();
				}
				if (results == null)  
				{
					res.status(200).json({message: 'No matching document'});
					db.close();
				}
				else 
				{
					
					results.cuisine=req.params.value;
				
					results.save(function(err)
						{
							if (err) throw err
							//console.log("Updated");	

						});
					res.status(200).json({message: 'Update done'});
					//res.status(200).json(results);
					//console.log("lulul "+results);
					db.close();

				}
				db.close();
    		});
		}else if(field=="name")
			{
				Restaurant.find({restaurant_id: req.params.id},function(err,results)
				{
					console.log("name");
		       		if (err) 
		       		{
						res.status(500).json(err);
						throw err
						db.close();
					}
					if (results == null)  
					{
						res.status(200).json({message: 'No matching document'});
						db.close();
					}
					else 
					{
						
						results.name=req.params.value;
					
						results.save(function(err)
							{
								if (err) throw err
								//console.log("Updated");	

							});
						res.status(200).json({message: 'Update done'});
						//res.status(200).json(results);
						//console.log("lulul "+results);
						db.close();

					}
					db.close();
    			});
			}else if(field=="borough")
			{
				Restaurant.find({restaurant_id: req.params.id},function(err,results)
				{
					console.log("borough");
		       		if (err) 
		       		{
						res.status(500).json(err);
						throw err
						db.close();
					}
					if (results == null)  
					{
						res.status(200).json({message: 'No matching document'});
						db.close();
					}
					else 
					{
						
						results.borough=req.params.value;
					
						results.save(function(err)
							{
								if (err) throw err
								//console.log("Updated");	

							});
						res.status(200).json({message: 'Update done'});
						//res.status(200).json(results);
						//console.log("lulul "+results);
						db.close();

					}
					db.close();
				});
			}
		});
		
});

app.listen(process.env.PORT || 8099);

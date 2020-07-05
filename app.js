var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
	request("https://api.covid19api.com/summary", function(error, response, body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			var country = req.query.country;
			console.log(country);
			res.render("index", { parsedData: parsedData, country:country });
		}
	});
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/info", function(req, res){
	res.render("info");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server running...");
});
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

app.get("/news", function(req, res){
	request("https://newsapi.org/v2/top-headlines?country=in&q=covid&apiKey=f3e9a552082b48ab827e43b810e7ea38", function(error, response, body){
		if(!error && response.statusCode == 200){
			var newsData = JSON.parse(body);
			res.render("news", {newsData: newsData});
		}
	})
});

app.get("/about", function(req, res){
	res.render("about");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server running...");
});
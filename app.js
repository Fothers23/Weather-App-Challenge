const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
	const query = req.body.cityName;
	const apiKey = "9109bd6b34064afac6927ee8210f1064";
	const unit = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey 
	+ "&units=" + unit;

	https.get(url, function(response) {
		
		response.on("data", function(data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

			res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
			res.write("<p> The weather is currently " + description + "</p>");
			res.write("<img src='" + imageUrl + "'>")
			res.send();
		})
	});
});

app.listen(port, function() {
	console.log(`Weather Project running on localhost: ${port}`);
});
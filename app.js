const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "2751ad56202bde9560a082bdf8540712";
  const unit = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function (response){
    console.log(response.statusCode);

  response.on('data', function(data){
    const weatherData = JSON.parse(data);
    console.log(weatherData);
    const temp = weatherData.main.temp;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The temperature in " + weatherData.name + " is "+temp+" degrees Celsius.</h1>");
    res.write("<h3>The weather is currently "+ desc +".</h3>");
    res.write("<img src="+imgURL+">");
    res.send();
  })

  })
})

app.listen(port, () => {
  console.log(`Weather app listening at http://localhost:${port}`)
});

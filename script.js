http://app.useconst express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/WEATH', (req, res) => {
  const cityname = req.body.city;
  const apiKey = '5f8d900f3ea9d3c9f6f457dffb8d5200';
  const url = `https://api.openweathermap.org/data/2.5/weather?key=${apikey}&q=${cityname}&api=no`;

  https.get(url, (response) => {

    response.on('data', (data) => {

      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const name = weatherData.location.name;
      console.log(name);
      const temperature = weatherData.current.temp_c;
      console.log(temperature);
      const feels = weatherData.current.condition.text;
      console.log(feels)
      res.send(`
      <style>
      body{
    height:100vh;
      background-image:url('https://31.media.tumblr.com/tumblr_maolcpnQS61qakj1do1_500.gif');
  background-repeat:no-repeat;
  background-size:cover;
  
}
.f{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.f1{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.mob{
    height:400px;
    width:400px;
    border: 1px solid rgb(209, 209, 209);
    text-align: center;
    font-size:28px;
    background-color:white;
    border-radius:10px;
  
  
}
.n{
font-size:55px;
}
</style>
      <body class="f"><div class="mob f1">
       <p class="n"> ${name}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Feels: ${feels}</p>
        </div>
        </body>
    `);
    })
  })
})
app.listen(3000, () => {
  console.log('server started');
  console.log(__dirname);
});
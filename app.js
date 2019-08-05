var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var ACCESS_KEY = process.env.ACCESS_KEY;
var AUTH_KEY = process.env.AUTH_KEY;
var AIRCON_ID = process.env.AIRCON_ID;
var WAITING_TIME = Number(process.env.WAITING_TIME);

function postMessage(bodyStr){
  var request = require('request');
  var headers = {
    'Authorization': 'Bearer ' + AUTH_KEY
  };
  var options = {
    url: 'https://api.nature.global/1/appliances/' + AIRCON_ID + 'aircon_settings',
    method: 'POST',
    headers: headers,
    form: {
      "button": "power-off"
    }
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }else{
      console.log('error' + response.statusCode);
    }
  });
}

app.post('/input', function(req, res){
  res.set('Content-Type', 'application/json');
  console.log('------- input');
  console.log('req.body');
  if(req.body.accessKey == ACCESS_KEY){
    setTimeout(function(){
      postMessage(req.body.message);
    },WAITING_TIME);
    res.send("{'request':'OK'}");
  } else {
    res.send("{'request':'ERROR'}");
  }
});

app.get('/', function(request, response) {
  response.send('Hello, World.');
});

app.listen(app.get('port'), function(){
  console.log('Node app is running on port', app.get('port'));
});

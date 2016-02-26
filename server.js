var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/*', function(req,res,next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", 'X-Requested-With');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var data = [
  
];

app.get('/', function(req,res) {
  res.send(data);
});

app.listen(8080, function() {
  console.log('running at 8080');
});

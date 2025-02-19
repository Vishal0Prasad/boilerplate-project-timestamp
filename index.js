// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function numCheck(dateString){
  let toNum = Number(dateString);
  if(isNaN(toNum))
    return false;
  return true;
}

app.get("/api/:date?",function(req,res, next){

  const isNum = numCheck(req.params.date);
  const isValid = !isNaN(Date.parse(req.params.date))

  if(!req.params.date){
    let date = new Date();
    res.send({
      unix: Number(date.getTime()),
      utc:  date.toUTCString()
    })
  }
  else if(!isNum && !isValid){
    res.send({
      error: "Invalid Date"
    });
  }
  else if(isNum){
    let date = new Date(Number(req.params.date));
    res.send({
      unix: Number(date.getTime()),
      utc: date.toUTCString(),
    })
  }
  else{
    let date = new Date(req.params.date);
    res.send({
      unix: Number(date.getTime()),
      utc: date.toUTCString(),
    })
  }
  next();
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

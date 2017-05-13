var express = require('express')
var app = express()
var port = 8080;
var bad_result = {"unix":null, "natural": null}
module.exports =app 
function formatNatDate(date){
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  M = months[date.getMonth()]
  d = date.getDate().toString()
  y = date.getFullYear().toString()
  if (M !== undefined) {
	  return M + " " + d + ", " + y
  } 
  throw "invalid_date"
  

}
app.get("/:nat([A-Z][a-z]*%20\\d?\\d,?%20\\d{4})", function(req, res){
  console.log(req.params.nat);
  nat = req.params.nat;
  try{
	  date = new Date(nat)
	  var unix = Math.round(+date/1000);
	  res.send({"unix": unix, "natural": formatNatDate(date)});
  } catch (e) {

	  res.send(bad_result);
  }
})

app.get("/:unix(\\d+)", function(req, res){
  console.log(req.params.unix);
  unix = parseInt(req.params.unix)
  try{
	  date = new Date(unix * 1000)
	  res.send({"unix": unix, "natural": formatNatDate(date)});
  } catch (e){

	  res.send(bad_result);
  }
})

app.get('^/$', function (req, res) {
  res.send('Hi there! Try putting a date/unix timestamp into the url.')
})

app.get("/*", function(req, res){
	  res.send(bad_result);
})


app.listen(port, function () {
  console.log('Example app listening on port %s!', port)
})


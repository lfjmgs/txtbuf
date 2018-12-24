var express = require('express');
var fs = require('fs')
var app = express();

var txtList = JSON.parse(fs.readFileSync('./txtList.json').toString('utf-8'));

app.use(express.static('public'));

app.get('/list', function (req, res) {
  res.json(txtList)
});

app.get('/add', function (req, res) {
  var txt = req.param('txt')
  if (!txt) {
    res.sendStatus(400);
    return;
  }
  if (txtList.length == 10) {
    txtList.shift()
  }
  txtList.push(txt);
  fs.writeFile('./txtList.json', JSON.stringify(txtList), (e) => {
    if (e) {
      console.log(e)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    } 
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
var express = require('express')
var path = require('path')
var app = express()
var http = require('http')
// var ejs = require('ejs')
// var request = require('request')

var ms = require('ms')
// app.set("views", path.join(__dirname, '/dist/index'));
// app.engine('.html', ejs.__express)
// app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: ms('7d')
}))
app.get('/:app', function (req, res) {
  // var data = req.params.app;
  // console.log(data)
  res.sendfile('dist/index.html')
})
app.get('/all/:id', function (req, res) {
  // var data = req.params.app;
  // console.log(data)
  res.sendfile('dist/index.html')
})


app.get('/m', function (req, res) {
  res.render('m/index')
})

app.post('/ajaxTime', function (req, res) {
  // res.json({'current': {"awardTime" : "2018-04-18 18:20:00", "periodNumber": "056"},
  // "next": {"awardTime" : "2018-04-18 18:30:00", "periodNumber" : "057", "awardTimeInterval" : 350000}})
})

var server = http.createServer(app);

server.listen(3000, function () {
  console.log('Express server listening on port' + 3000);
});



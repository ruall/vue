var express = require('express')
var path = require('path')
var app = express()
var http = require('http')
// var ejs = require('ejs')

var ms = require('ms')
// app.set("views", path.join(__dirname, '/dist/index'));
// app.engine('.html', ejs.__express)
// app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: ms('7d')
}))
var address = path.join(__dirname, 'dist');
app.get('/:id', function (req, res) {
  // var data = req.params.id;
  res.sendfile(address + '/index.html')
})
// app.get('/authorize/:id', function (req, res) {
//   // var data = req.params.id;
//   res.sendfile(address +'/index.html')
// })
// app.get('/app/:id', function (req, res) {
//   var data = req.params.id;
//   console.log(data)
//   res.sendfile(address +'/index.html')
// })

var server = http.createServer(app);

server.listen(8081, function () {
  console.log('Express server listening on port' + 8081);
});



const express = require('express');
const os = require('os');
var bodyParser = require('body-parser');
const app = express();
var webpack = require('webpack');
var config = require('/home/amura/simple-react-full-stack/webpack.config.js');
var compiler = webpack(config);
var path = require('path');
var fs = require('fs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");   
    next();
  });

  app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html')
      res.send(result);
      res.end();
    });
  });

  app.listen(3000, () => console.log('Listening on port 3000!'));

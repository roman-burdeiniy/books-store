var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/img", express.static(__dirname + '/img'));

if (process.env.NODE_ENV == "prod"){
  app.use(express.static(path.join(__dirname, 'public')));
}else{
  enableDebugMode();
}

app.get('*', function(req, res, next){
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function enableDebugMode(){
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConfig = require('./config/webpack.dev.config');

  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath:webpackConfig.output.publicPath,
    stats: {colors:true}
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}

module.exports = app;

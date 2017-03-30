var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var FrontendManager = require('./managers/FrontendManager').default;
import InvalidPathError from './errors/InvalidPathError'


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (isDevMode()){
    enableDebugMode();
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get("*", function(req, res, next){
    console.log("req= " + req.url);
    const frontendManager = new FrontendManager();
    frontendManager.buildStore(req, res)
        .then((store) => {
                    const bundle = frontendManager.buildBundle(req.url, store);
                    const html = !isDevMode() ? bundle.html : '';
                    console.log(html);
                    res.render('index', {html, parsedState : bundle.parsedState});
                  })
        .catch(error => {
            console.log(error)
            if (error instanceof InvalidPathError)
                res.redirect(error.redirectURL)
        });
});

function isDevMode(){
    return process.env.NODE_ENV == "development";
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Not found request req= " + req.url);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("Error stack = " + err.stack);
  res.locals.message = err.message;
  res.locals.error = isDevMode() ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function enableDebugMode(){
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConfig = require('./webpackConfig/webpack.dev.config.js');

  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath:webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: {colors:true}
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}

module.exports = app;

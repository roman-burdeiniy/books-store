/**
 * Created by roman_b on 2/27/2017.
 */
var express = require('express');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var apiRoute = require('./routes/api-route-config');
var winston = require('winston');
var favicon = require('serve-favicon');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("/shop-api/img", express.static(__dirname + '/img'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/shop-api', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/shop-api', apiRoute);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    let mes = 'Internal server error occured';
    const errorObj = {
        message : req.app.get('env') === 'development' ? (mes +': ' + err.message) : 'Internal server error occurred'
    }
    res.status(err.status || 500).send({error : errorObj});
    winston.error(err.stack);
});

module.exports = app;

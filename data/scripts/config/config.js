/**
 * Created by roman_b on 4/22/2017.
 */
var prod = require('./prod');
var dev = require('./dev');

var map = {
    'production' : prod,
    'development' : dev
}

module.exports = map[process.env.NODE_ENV || "development"];
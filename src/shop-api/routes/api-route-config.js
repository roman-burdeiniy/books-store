/**
 * Created by roman_b on 1/17/2017.
 */
var express = require('express');
var router = express.Router();
import CategoriesRoute from './CategoriesRoute';

new CategoriesRoute().register(router);

module.exports = router;
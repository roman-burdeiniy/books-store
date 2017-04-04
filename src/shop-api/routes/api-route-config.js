/**
 * Created by roman_b on 1/17/2017.
 */
var express = require('express');
var router = express.Router();
import RouteRegistrator from './RouteRegistrator';
import {getAllCategories} from './descriptors/CategoriesRouteDescriptor';
import {getItemsByCategory, getItemsBySubCategory, getItemsByPopular, getItemsByIds} from './descriptors/ItemsRouteDescriptor';

new RouteRegistrator([getAllCategories, getItemsByPopular, getItemsByCategory,
    getItemsBySubCategory, getItemsByIds]).register(router);

module.exports = router;
/**
 * Created by roman_b on 1/17/2017.
 */
var express = require('express');
var router = express.Router();
import RouteRegistrator from './RouteRegistrator';
import {getAllCategories} from './descriptors/CategoriesRouteDescriptor';
import {getItemsByCategory, getItemsBySubCategory, getItemsByPopular, getItemById} from './descriptors/ItemsRouteDescriptor';

new RouteRegistrator([getAllCategories]).register(router);
new RouteRegistrator([getItemsByPopular, getItemsByCategory, getItemsBySubCategory, getItemById]).register(router);

module.exports = router;
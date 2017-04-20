/**
 * Created by roman_b on 1/17/2017.
 */
var express = require('express');
var router = express.Router();
import RouteRegistrator from './RouteRegistrator';
import {getAllCategories} from './descriptors/CategoriesRouteDescriptor';
import {placeOrder} from './descriptors/OrdersRouteDescriptor';
import {getItemsByCategory, getItemsBySubCategory, getItemsByPopular,
    getItemsByIds, getItemsBySearchPattern, getItemsBySearchTag} from './descriptors/ItemsRouteDescriptor';

new RouteRegistrator([getItemsBySearchPattern, getItemsBySearchTag, getAllCategories, getItemsByPopular, getItemsByCategory,
    getItemsBySubCategory, getItemsByIds, placeOrder]).register(router);

module.exports = router;
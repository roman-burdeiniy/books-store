/**
 * Created by roman_b on 2/2/2017.
 */
import {selectMenuItem, selectSubMenuItem, expandMenuItem, collapseMenuItem} from '../actions/menu';
import {searchItems} from '../actions/search';
import {CATEGORY_ID, SUB_CATEGORY_ID, CATEGORY, SUB_CATEGORY,
    ITEM, ITEM_ID, EXPANDED_CATEGORY, CART, CHECKOUT,
    ORDER, ORDER_ID, ERROR, ITEMS, SEARCH, STRICT_SEARCH, SEARCH_PATTERN} from './PathKeys';
import _ from 'underscore';

export const CHECKOUT_ROUTE = `/${CHECKOUT}/${CART}`;

const CHECKOUT_ROUTE_TEMPLATE = `^\/${CHECKOUT}\/${CART}$`;

const buildTemplate = (...args) => {
    let result = args.reduce((prev, current) => {
        prev += `\/${current}\/[a-zA-Z0-9]+`;
        return prev;
    }, '');
    return `^${result}$`;
}

const ACCEPTABLE_ROUTES = [
    `/${CATEGORY}/:${CATEGORY_ID}`,
    `/${CATEGORY}/:${CATEGORY_ID}/${SUB_CATEGORY}/:${SUB_CATEGORY_ID}`,
    `/${ITEM}/:${ITEM_ID}`, `/${CHECKOUT}/:${CART}`,
    `/${CHECKOUT}/${ORDER}/:${ORDER_ID}`,
    `/${ITEMS}/${SEARCH}/:${SEARCH_PATTERN}`];

const STATIC_ROUTES = [
    CHECKOUT_ROUTE
]

const ACCEPTABLE_ROUTES_TEMPLATES = [buildTemplate(CATEGORY),
    buildTemplate(CATEGORY, SUB_CATEGORY), buildTemplate(ITEM),
    CHECKOUT_ROUTE_TEMPLATE];

const getActionsMap = () => {
    return {
        [CATEGORY_ID] : selectMenuItem,
        [EXPANDED_CATEGORY] : expandMenuItem,
        [SUB_CATEGORY_ID] : selectSubMenuItem,
        [SEARCH_PATTERN] : searchItems
    }
}

let generateCategoryRoute = function(catID){
    return `/${CATEGORY}/${catID}`
}

let generateOrderRoute = function(orderID){
    return `/${CHECKOUT}/${ORDER}/${orderID}`
}

let generateErrorRoute = function(){
    return `/${ERROR}`
}

let generateSubCategoryRoute = function(catID, subCatID){
    let subCatPart = !_.isEmpty(subCatID) ?  `/${SUB_CATEGORY}/${subCatID}` : '';
    return `${generateCategoryRoute(catID)}${subCatPart}`;
}

let generateItemRoute = function(catID, subCatID, itemID){
    return `${generateSubCategoryRoute(catID, subCatID)}/${ITEM}/${itemID}`;
}

let generateSearchRoute = function(pattern){
    return `/${ITEMS}/${SEARCH}/${pattern}`
}

function isStaticRoute(pathname){
    return STATIC_ROUTES.find(route => route == pathname) != null;
}

export {getActionsMap, ACCEPTABLE_ROUTES, ACCEPTABLE_ROUTES_TEMPLATES, STATIC_ROUTES,
    generateCategoryRoute, generateSubCategoryRoute, generateItemRoute, generateSearchRoute,
    generateOrderRoute, generateErrorRoute, isStaticRoute};

/**
 * Created by roman_b on 2/2/2017.
 */
import {selectMenuItem, selectSubMenuItem} from '../actions/menu';
import {CATEGORY_ID, SUB_CATEGORY_ID, CATEGORY, SUB_CATEGORY, ITEM, ITEM_ID} from './PathKeys';
import _ from 'underscore';

const buildTemplate = (...args) => {
    let result = args.reduce((prev, current) => {
        prev += `\/${current}\/[a-zA-Z0-9]+`;
        return prev;
    }, '');
    return `^${result}$`;
}

const ACCEPTABLE_ROUTES = [`/${CATEGORY}/:${CATEGORY_ID}`,
    `/${CATEGORY}/:${CATEGORY_ID}/${SUB_CATEGORY}/:${SUB_CATEGORY_ID}`,
    `/${CATEGORY}/:${CATEGORY_ID}/${SUB_CATEGORY}/:${SUB_CATEGORY_ID}/${ITEM}/:${ITEM_ID}`,
    `/${CATEGORY}/:${CATEGORY_ID}/${ITEM}/:${ITEM_ID}`];

const ACCEPTABLE_ROUTES_TEMPLATES = [buildTemplate(CATEGORY), buildTemplate(CATEGORY, ITEM),
    buildTemplate(CATEGORY, SUB_CATEGORY), buildTemplate(CATEGORY, SUB_CATEGORY, ITEM)];

let actionsMap = {
    [CATEGORY_ID] : selectMenuItem,
    [SUB_CATEGORY_ID] : selectSubMenuItem
}

let generateCategoryRoute = function(catID){
    return `/${CATEGORY}/${catID}`
}

let generateSubCategoryRoute = function(catID, subCatID){
    let subCatPart = !_.isEmpty(subCatID) ?  `/${SUB_CATEGORY}/${subCatID}` : ''
    return `${generateCategoryRoute(catID)}${subCatPart}`;
}

let generateItemRoute = function(catID, subCatID, itemID){
    return `${generateSubCategoryRoute(catID, subCatID)}/${ITEM}/${itemID}`;
}

export {actionsMap, ACCEPTABLE_ROUTES, ACCEPTABLE_ROUTES_TEMPLATES,
    generateCategoryRoute, generateSubCategoryRoute, generateItemRoute};

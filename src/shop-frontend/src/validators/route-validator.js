/**
 * Created by roman_b on 2/22/2017.
 */
import {getRouteObject} from '../utils/route-utils';
import { ACCEPTABLE_ROUTES_TEMPLATES} from '../constants/RoutesToActionsMap';
import _ from 'underscore';
import {CATEGORY_ID, SUB_CATEGORY_ID, ITEM_ID} from '../constants/PathKeys';

export const validateRoute = (path, store) => {
                                let result = compose(validateSyntax, validateSemantics);
                                return result(path, store.getState());
                            }

function getValid(path){
    return condition({true : path, false: '/'});
}

function validateSyntax(inputPath){
    let result = ACCEPTABLE_ROUTES_TEMPLATES.reduce((previousValue, currentValue)=>{
        let res = new RegExp(currentValue).test(inputPath);
        return res || previousValue;
    }, false);
    let res = getValid(inputPath)(result);
    return res;
}

function validateSemantics(path, store){
    let res = condition({true: () => path, false : () => {
        let routeInfo = getRouteObject(path);
        let checkExist = curried(routeInfo, store);
        let isItem = checkExist(isItemPath);
        let isSubCat = checkExist(isSubCatPath);
        let isCat = checkExist(isCatPath);
        let result = getValid(path)(isCat || isSubCat || isItem);
        return result;
    }})
    return res(path == '/')();
}

function compose(f, g) {
    return function(path, store) {
        return g(f(path), store);
    }
}

function curried(routeInfo, store) {
    return function(fun) {
        let catCheck = parameterCheckFabric(store, routeInfo);
        return fun(catCheck);
    };
};

function isCatPath(catCheck){
    const isValidWithEmptyStore = (store, routeInfo) => {
        return routeInfo[CATEGORY_ID] != null && routeInfo[SUB_CATEGORY_ID] == null && _.isEmpty(store.menu.menuItems);
    }
    const isValidWithFilledStore = (store, routeInfo) => {
        let findCat = combineCatFind(getCategories, findItem, store.menu);
        let found = findCat(routeInfo[CATEGORY_ID]);
        return found != null && routeInfo[SUB_CATEGORY_ID] == null;
    }
    return catCheck(isValidWithEmptyStore) || catCheck(isValidWithFilledStore)
}

function isItemPath(catCheck){
    const isValidWithEmptyStore = (store, routeInfo) => {
        return routeInfo[ITEM_ID] != null && _.isEmpty(store.menu.menuItems);
    }
    const isValidWithFilledStore = (store, routeInfo) => {
        let findParent = condition({true : () => combineSubCatFind(getSubCategories, findItem, store.menu),
            false : () => combineCatFind(getCategories, findItem, store.menu)})(routeInfo[SUB_CATEGORY_ID] != null);
        let parent = findParent()(routeInfo[CATEGORY_ID], routeInfo[SUB_CATEGORY_ID]);
        let found = parent != null && parent.items != null ? parent.items.find(item => item._id == routeInfo[ITEM_ID]) : null;
        return found != null;
    }
    return catCheck(isValidWithEmptyStore) || catCheck(isValidWithFilledStore)
}

function isSubCatPath(catCheck){
    const isValidWithEmptyStore = (store, routeInfo) => {
        return !_.isEmpty(routeInfo[CATEGORY_ID]) && !_.isEmpty(routeInfo[SUB_CATEGORY_ID]) && _.isEmpty(store.menu.menuItems);
    }
    const isValidWithFilledStore = (store, routeInfo) => {
        let findSubCat = combineSubCatFind(getSubCategories, findItem, store.menu);
        let found = findSubCat(routeInfo[CATEGORY_ID], routeInfo[SUB_CATEGORY_ID]);
        return found != null && routeInfo[ITEM_ID] == null;
    }

    return catCheck(isValidWithEmptyStore) || catCheck(isValidWithFilledStore);
}

function combineCatFind(f1, f2, item){
    return (id)=>{
        return f2(f1(item), id);
    }
}

function combineSubCatFind(f1, f2, item){
    let catFind = combineCatFind(getCategories, findItem, item);
    return (id, subId)=>{
        return f2(f1(catFind(id)), subId);
    }
}

function getCategories(menu){
    return menu.menuItems;
}

function getSubCategories(cat){
    return cat != null ? cat.children : null;
}

function findItem(items, id){
    return !_.isEmpty(items) && id != null ? items.find((item)=>item._id === id) : null;
}

function parameterCheckFabric(store, routeInfo){
    return (fun) => {
        return fun(store, routeInfo)
    }
}

function condition(obj){
    return function(val){
        return obj[val];
    }
}

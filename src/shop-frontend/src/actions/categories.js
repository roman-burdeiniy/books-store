/**
 * Created by roman_b on 1/23/2017.
 */
require('es6-promise').polyfill();
import 'isomorphic-fetch';
var Config = require('Config');
import {fetchItems} from './items';
import {loadData} from '../services/DataService';

import {LOADING_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_ERROR} from '../constants/ActionTypes';

export const fetchCategories = function() {
    return function (dispatch) {
        dispatch(loadingCategories());
        loadData(`${Config.apiEndpoint}/categories`)(
            (result) => {
                dispatch(loadCategoriesSuccess(result))
            },
            (error) => {
                dispatch(loadCategoriesError(error));
            });
    }
}

function getDataModel(){
    return store.getState().dataModel;
}

export function loadingCategories() {
    return {
        type: LOADING_CATEGORIES
    };
}

export function loadCategoriesSuccess(categories) {
    return {
        type: LOAD_CATEGORIES_SUCCESS,
        payload: categories
    };
}

export function loadCategoriesError(error) {
    return {
        type: LOAD_CATEGORIES_ERROR,
        payload: error
    };
}
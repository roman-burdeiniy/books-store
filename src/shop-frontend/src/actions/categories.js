/**
 * Created by roman_b on 1/23/2017.
 */
require('es6-promise').polyfill();
import 'isomorphic-fetch';
import getConfig from '../config/Config';
import {fetchItems} from './items';
import {loadData} from '../services/DataService';

import {LOADING_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_ERROR} from '../constants/ActionTypes';

export const fetchCategories = function() {
    return function (dispatch) {
        dispatch(loadingCategories());
        loadData(`${getConfig().apiEndpoint}/categories`)
            .then(result => dispatch(loadCategoriesSuccess(result)))
            .catch(error => dispatch(loadCategoriesError(error)))
    }
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
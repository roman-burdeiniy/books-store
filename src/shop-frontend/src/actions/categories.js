/**
 * Created by roman_b on 1/23/2017.
 */
require('es6-promise').polyfill();
import 'isomorphic-fetch';
var Config = require('Config');

import {LOADING_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_ERROR} from '../constants/ActionTypes';

export const fetchCategories = function(){
    return function(dispatch){
        dispatch(loadingCategories());
        fetch(Config.apiEndpoint + '/categories',
            {method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }}).then(res => {
                    return res.json();
                    })
                .then(categories => {
                    dispatch(loadCategoriesSuccess(categories));
                })
                .catch(err=>{
                    dispatch(loadCategoriesError(err));
                })
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
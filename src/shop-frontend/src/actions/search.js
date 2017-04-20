/**
 * Created by roman_b on 4/18/2017.
 */
import {LOADING_SEARCH_ITEMS, LOAD_SEARCH_ITEMS_SUCCESS, LOAD_SEARCH_ITEMS_ERROR} from '../constants/ActionTypes';
import {MAIN_SEARCH, PRE_SEARCH} from '../constants/SearchTypes';
import {loadData} from '../services/DataService';
import getConfig from '../config/Config';
import _ from 'underscore';

export function loadSearchItemsError(error, subType, searchPattern) {
    return {
        type: LOAD_SEARCH_ITEMS_ERROR,
        error,
        subType,
        searchPattern
    };
}

export function loadSearchItemsSuccess(items, subType, searchPattern) {
    return {
        type: LOAD_SEARCH_ITEMS_SUCCESS,
        items,
        subType,
        searchPattern
    };
}

export function loadingSearchItems(subType, searchPattern) {
    return {
        type: LOADING_SEARCH_ITEMS,
        subType,
        searchPattern
    };
}

export function searchItems(searchPatter){
    return (dispatch) => {
        dispatch(loadingSearchItems(MAIN_SEARCH, searchPatter));
        return loadData(`${getConfig().apiEndpoint}/items/search/`, [searchPatter], true)
            .then(result => dispatch(loadSearchItemsSuccess(result, MAIN_SEARCH, searchPatter)))
            .catch(error => {
                console.log(error);
                dispatch(loadSearchItemsError(error, MAIN_SEARCH, searchPatter))})
    }
}

export function preSearchItems(searchPatter){
    return (dispatch) => {
        dispatch(loadingSearchItems(PRE_SEARCH, searchPatter));
        return loadData(`${getConfig().apiEndpoint}/items/pre_search/`, [searchPatter], true)
            .then(result => {dispatch(loadSearchItemsSuccess(result, PRE_SEARCH, searchPatter));})
            .catch(error => {
                console.log(error);
                dispatch(loadSearchItemsError(error, PRE_SEARCH, searchPatter))})
    }
}

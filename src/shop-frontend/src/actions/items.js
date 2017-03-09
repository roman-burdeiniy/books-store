/**
 * Created by roman_b on 3/3/2017.
 */
import {LOAD_ITEMS_SUCCESS, LOAD_ITEMS_ERROR, LOADING_ITEMS,
    LOADING_SELECTED_ITEM, LOAD_SELECTED_ITEM_SUCCESS, LOAD_SELECTED_ITEM_ERROR} from '../constants/ActionTypes';
import _ from 'underscore';
import {loadData} from '../services/DataService';
var Config = require('Config');
import {store} from '../stores/app-store';
import {getGroupItems} from '../stores/finders/FindSelectedGroupStrategy';
import {getItemById} from '../utils/array-utils';

export function fetchItems(...idsChain){
    return (dispatch) => {
        dispatch(loadingItems(idsChain));
        loadData(`${Config.apiEndpoint}/items/`, idsChain, true)(
            (result) => {dispatch(loadItemsSuccess(idsChain, result));},
            (error) => {dispatch(loadItemsError(idsChain, error));}
        )
    }
}

export function fetchSelectedItem(id){
    let items = getGroupItems(store.getState());
    let foundItem = getItemById(items, id);
    return (dispatch) => {
        if (foundItem == null){
            loadItem(id, dispatch);
        }else{
            dispatch(loadSelectedItemSuccess(id, foundItem));
        }
    }
}

function loadItem(id, dispatch){
    dispatch(loadingSelectedItem(id));
    loadData(`${Config.apiEndpoint}/item/`, [id], true)(
        (result) => {dispatch(loadSelectedItemSuccess(id, result));},
        (error) => {dispatch(loadSelectedItemError([id], error));}
    )
}

function loadSelectedItemSuccess(id, item) {
    return {
        type: LOAD_SELECTED_ITEM_SUCCESS,
        id,
        item
    };
}

function loadSelectedItemError(id, error) {
    return {
        type: LOAD_SELECTED_ITEM_ERROR,
        id,
        error
    };
}

function loadingSelectedItem(id){
    return {
        type: LOADING_SELECTED_ITEM,
        id
    };
}


export function loadItemsSuccess(groupIdsChain, items) {
    return {
        type: LOAD_ITEMS_SUCCESS,
        groupIdsChain,
        items
    };
}

export function loadItemsError(groupIdsChain, error) {
    return {
        type: LOAD_ITEMS_ERROR,
        groupIdsChain,
        error
    };
}

export function loadingItems(groupIdsChain){
    return {
        type: LOADING_ITEMS,
        groupIdsChain
    };
}
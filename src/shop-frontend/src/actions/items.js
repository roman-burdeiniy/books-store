/**
 * Created by roman_b on 3/3/2017.
 */
import {LOAD_ITEMS_SUCCESS, LOAD_ITEMS_ERROR, LOADING_ITEMS,
    LOADING_SELECTED_ITEM, LOAD_SELECTED_ITEM_SUCCESS, LOAD_SELECTED_ITEM_ERROR,
    ITEM_NOT_FOUND} from '../constants/ActionTypes';
import _ from 'underscore';
import {loadData} from '../services/DataService';
import getConfig from '../config/Config';
import {getStore} from '../stores/app-store';
import {getGroupItems} from '../stores/finders/GroupFinder';
import {getItemById} from '../utils/array-utils';

export function fetchItems(...idsChain){
    return (dispatch) => {
                dispatch(loadingItems(idsChain));
                return loadData(`${getConfig().apiEndpoint}/items/`, idsChain, true)
                    .then(result => dispatch(loadItemsSuccess(idsChain, result)))
                    .catch(error => dispatch(loadItemsError(idsChain, error)))
            }
}

export function fetchSelectedItem(id){
    let items = getGroupItems(getStore().getState());
    let foundItem = getItemById(items, id);
    return (dispatch) => {
        if (foundItem == null){
            dispatch(loadingSelectedItem(id));
            return loadItem(id, dispatch);
        }else{
            dispatch(loadSelectedItemSuccess(id, foundItem));
            return Promise.resolve(foundItem);
        }
    }
}

export function loadItem(id, dispatch){
    return loadData(`${getConfig().apiEndpoint}/item/`, [id], true)
        .then(result => {
            if (_.isEmpty(result)){
                dispatch(itemNotFound(id))
            }else{
                dispatch(loadSelectedItemSuccess(id, result[0]))
            }
        }).catch(error => dispatch(loadSelectedItemError([id], error)))
}

function loadSelectedItemSuccess(id, item) {
    return {
        type: LOAD_SELECTED_ITEM_SUCCESS,
        id,
        item
    };
}

function itemNotFound(id) {
    return {
        type: ITEM_NOT_FOUND,
        id
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

export function loadingItems(groupIdsChain){
    return {
        type: LOADING_ITEMS,
        groupIdsChain
    };
}

export function loadItemsError(groupIdsChain, error) {
    return {
        type: LOAD_ITEMS_ERROR,
        groupIdsChain,
        error
    };
}
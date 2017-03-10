/**
 * Created by roman_b on 3/10/2017.
 */

import {ADD_ITEM_TO_CART} from '../constants/ActionTypes';
import {getItemIndex} from '../utils/array-utils';
import update from 'immutability-helper';

let initialState = [];

export default function cartItems(state = initialState, action){
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return updateItems(state, action)
        default:
            return state
    }
}

function updateItems(items, action){
    let foundIndex = getItemIndex(items.map(obj => obj.item), action.item._id);
    let updatedRes;
    if (foundIndex != -1){
        let newQuantity = items[foundIndex].quantity + action.quantity;
        updatedRes = update(items, {[foundIndex] : {quantity : {$set : newQuantity}}});
    }else{
        updatedRes = [...items, {item : action.item, quantity : action.quantity}]
    }
    return updatedRes;
}

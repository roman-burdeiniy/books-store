/**
 * Created by roman_b on 3/10/2017.
 */

import {ADD_ITEM_TO_CART, QUANTITY_CHANGE} from '../constants/ActionTypes';
import {getItemIndex} from '../utils/array-utils';
import update from 'immutability-helper';

let initialState = {items: [], totalPrice : 0, totalCount : 0};

export default function cart(state = initialState, action){
    switch (action.type) {
        case ADD_ITEM_TO_CART:
        case QUANTITY_CHANGE:
            const updatedItems = updateItems(state.items, action);
            return {...state, items : updatedItems, totalPrice : getTotalPrice(updatedItems),
                totalCount : getTotalCount(updatedItems)}
        default:
            return state
    }
}

export function getTotalPrice(items){
    return items.reduce((prev, item) => {
        return prev + item.quantity * item.item.price;
    }, 0);
}

export function getTotalCount(items){
    let res = items.reduce((prev, current) => {
        prev.quantity = prev.quantity + current.quantity;
        return prev;
    }, {quantity : 0});
    return res.quantity;
}

function updateItems(items, action){
    let foundIndex = getItemIndex(items.map(obj => obj.item), action.item._id);
    let updatedRes;
    if (foundIndex != -1){
        let newQuantity = action.quantity;
        updatedRes = update(items, {[foundIndex] : {quantity : {$set : newQuantity}}});
    }else{
        updatedRes = [...items, {item : action.item, quantity : action.quantity}]
    }
    return updatedRes;
}


/**
 * Created by roman_b on 3/10/2017.
 */

import {ADD_ITEM_TO_CART} from '../constants/ActionTypes';

export const addItemToCart = function(item, quantity){
    return {
        type: ADD_ITEM_TO_CART,
        item,
        quantity
    };
}
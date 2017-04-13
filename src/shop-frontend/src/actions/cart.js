/**
 * Created by roman_b on 3/10/2017.
 */
import RouteManager from '../managers/RouteManager';
import CookieManager from '../managers/CookieManager';
import {ADD_ITEM_TO_CART, QUANTITY_CHANGE, EMPTY_CART, REMOVE_ITEM_FROM_CART} from '../constants/ActionTypes';
import {CHECKOUT_ROUTE} from '../constants/RoutesToActionsMap';

export const addItemToCart = function(item, quantity){
    return (dispatch) => {
        dispatch({type: ADD_ITEM_TO_CART, item, quantity});
        CookieManager.saveOrderCart();
    }
}

export const checkout = function(){
    return (dispatch) => {
        RouteManager.push(CHECKOUT_ROUTE);
        return Promise.resolve({});
    }
}

export const quantityChange = (quantityDescriptor) => (
        {
            type: QUANTITY_CHANGE,
            item: {_id: quantityDescriptor.id},
            quantity: quantityDescriptor.quantity
        }
    )

export const removeItem = (itemId)=>{
    return (dispatch) => {
        dispatch({type: REMOVE_ITEM_FROM_CART, itemId : itemId});
        CookieManager.saveOrderCart();
    }
}

export const emptyCart = () => {
    CookieManager.eraseOrderCart();
    return {type: EMPTY_CART}
}


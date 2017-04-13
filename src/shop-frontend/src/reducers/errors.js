/**
 * Created by roman_b on 4/11/2017.
 */
import {PLACE_ORDER_ERROR} from '../constants/ActionTypes'
import update from 'immutability-helper';
import PlaceOrderError from '../errors/PlaceOrderError';

let initialState = [];

export default function errors(state = initialState, action){
    switch (action.type) {
        case PLACE_ORDER_ERROR:{
            return [new PlaceOrderError(action.order)];
        }
        default:
            return state
    }
}
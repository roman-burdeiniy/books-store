/**
 * Created by roman_b on 2/16/2017.
 */
import {LOAD_CATEGORIES_SUCCESS, SET_ROUTE_LOCATION} from '../constants/ActionTypes';
import { browserHistory } from 'react-router';

let initialState = "";

export default function route(state = initialState, action){
    switch (action.type) {
        case SET_ROUTE_LOCATION:
            return action.path;
        default:
            return state
    }
}

/**
 * Created by roman_b on 1/23/2017.
 */
import { combineReducers } from 'redux';
import config from './config';
import langModel from './langModel';
import dataModel from './dataModel';
import cart from './cart';
import errors from './errors';
import ordersModel from './ordersModel';
import searchModel from './searchModel';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    config,
    langModel,
    dataModel,
    cart,
    errors,
    ordersModel,
    searchModel,
    form: formReducer
})
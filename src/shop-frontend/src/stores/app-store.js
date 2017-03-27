/**
 * Created by roman_b on 2/21/2017.
 */
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import booksApp from '../reducers/app-reducer'

let store = null;

export const buildStore = (preloadedState = {}) => {
    store = createStore(booksApp, preloadedState, applyMiddleware(thunkMiddleware));
    return store;
}

export const getStore = () => store;




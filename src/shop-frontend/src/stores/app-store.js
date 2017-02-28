/**
 * Created by roman_b on 2/21/2017.
 */
import thunkMiddleware from 'redux-thunk'
import {routeSyncMiddleware} from '../middleware/routeSyncMiddleware'
import {createStore, applyMiddleware} from 'redux'
import booksApp from '../reducers/app-reducer'

const configStore = ()=>{
    let result = createStore(booksApp, applyMiddleware(thunkMiddleware, routeSyncMiddleware));
    return result;
}

export const store = configStore();


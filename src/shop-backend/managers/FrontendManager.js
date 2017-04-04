/**
 * Created by roman_b on 3/17/2017.
 */
import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router'
var cookieParser = require('cookie-parser');

import App from '../frontendSource/src/App';
import {buildStore} from '../frontendSource/src/stores/app-store';
import {getDefaultLocale} from '../services/languages';
import {fetchCategories} from '../services/categories';
import {fetchCartItems} from '../services/cart'
import {matchRoute} from '../frontendSource/src/utils/route-utils';
import Config from '../config/Config';
import RouteManager from '../managers/RouteManager';

import {ITEM_ID} from '../frontendSource/src/constants/PathKeys';
import {LOAD_ITEMS_SUCCESS, LOAD_ITEMS_ERROR, LOAD_SELECTED_ITEM_SUCCESS,
    LOAD_SELECTED_ITEM_ERROR} from '../frontendSource/src/constants/ActionTypes';
import {isStaticRoute} from '../frontendSource/src/constants/RoutesToActionsMap';

export default class FrontendManager{

    constructor(){
        this.routeManager = new RouteManager();
    }

    buildBundle(route, store){
        const html = this.getHTML(route, store);
        const parsedState = this.prepareJSONString(store.getState());
        return {html, parsedState};
    }

    buildStore(req, res){
        return this.buildInitStore(req.url, this.getCartItems(req))
            .then(store => this.routeManager.validateRoute(req.url, store))
            .then(result => this.routeManager.applyRoute(result.validRoute, result.store))
    }

    prepareJSONString(obj){
        return JSON.stringify(obj);
    }

    getCartItems(req){
        return req.cookies.items_in_cart != null ?
            JSON.parse(req.cookies.items_in_cart) : []
    }

    buildInitStore(route, cartItems){
        const routeObj = matchRoute(route);
        const isStaticRequest = isStaticRoute(route) || (routeObj != null &&
            routeObj.hasOwnProperty(ITEM_ID));
        return new Promise((success, reject) => {
            fetchCategories(!isStaticRequest)
              .then(result => Promise.resolve(this.buildInitState(result)))
              .then(result => fetchCartItems(cartItems, result))
              .then(state => success(buildStore(state)))
              .catch(err => reject(err));
        })
    }

    buildInitState(dataModel){
        return {langModel: getDefaultLocale(), dataModel,
            config : Config};
    }

    getHTML(route, store){
        let html = '';
        const context = {};
        try{
            html = renderToString(<StaticRouter
                location={route}
                context={context}>
                <App store={store}/>
            </StaticRouter>);
        }catch(err){
            console.log(err.stack);
            throw err;
        }
        return html;
    }
}
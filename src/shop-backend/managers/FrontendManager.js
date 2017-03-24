/**
 * Created by roman_b on 3/17/2017.
 */
import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router'

import App from '../frontendSource/src/App';
import {getStore} from '../frontendSource/src/stores/app-store';
import {getDefaultLocale} from '../services/languages';
import {fetchCategories} from '../services/categories';
import {fetchItems, fetchSelectedItem} from '../frontendSource/src/actions/items';
import {getItemById} from '../frontendSource/src/utils/array-utils';
import Config from '../config/Config';
import RouteManager from '../managers/RouteManager';

import {LOAD_ITEMS_SUCCESS, LOAD_ITEMS_ERROR, LOAD_SELECTED_ITEM_SUCCESS,
    LOAD_SELECTED_ITEM_ERROR} from '../frontendSource/src/constants/ActionTypes';

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
        return this.buildInitStore()
            .then(store => this.routeManager.validateRoute(req.url, store))
            .then(result => this.routeManager.applyRoute(result.validRoute, result.store))
    }

    prepareJSONString(obj){
        return JSON.stringify(obj);
    }

    buildInitStore(){
        return new Promise((success, reject) => {
            fetchCategories().then(result => {
                const store = getStore({langModel: getDefaultLocale(), dataModel : result, config : Config});
                success(store);
            }).catch(err => reject(err));
        })
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
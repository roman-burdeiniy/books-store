/**
 * Created by roman_b on 2/2/2017.
 */
import {SET_ROUTE_LOCATION, APPLY_DEFAULT_ROUTE} from '../constants/ActionTypes';
import {getActionsMap, ACCEPTABLE_ROUTES, ACCEPTABLE_ROUTES_TEMPLATES} from '../constants/RoutesToActionsMap';
import {selectMenuItem, selectSubMenuItem} from './menu';
import {CATEGORY_ID, SUB_CATEGORY_ID, CATEGORY, SUB_CATEGORY, ITEM_ID} from '../constants/PathKeys';
import _ from 'underscore';
import {getRouteObject} from '../utils/route-utils';
import {default as routeManager} from '../managers/RouteManager';
import {fetchItems, fetchSelectedItem} from './items';
import {store} from '../stores/app-store';

export const setRouteLocation = function(pathname){
        let routeObj = getRouteObject(pathname);
        return function(dispatch){
            dispatchRouteState(dispatch, routeObj, CATEGORY_ID);
            dispatchRouteState(dispatch, routeObj, SUB_CATEGORY_ID);
            dispatchRouteState(dispatch, routeObj, ITEM_ID);
            if (isDefaultSelectionRoute(routeObj) || isGroupSelectionRoute(routeObj)){
                dispatch(fetchItems(getDataModel().selectedGroupId, getDataModel().selectedSubGroupId));
            }
        }
}

function isGroupSelectionRoute(routeObject){
    return (routeObject[CATEGORY_ID] || routeObject[SUB_CATEGORY_ID]) && !routeObject[ITEM_ID];
}

function isDefaultSelectionRoute(routeObject){
    return routeObject == null;
}

function dispatchRouteState(dispatch, routeObject, key){
    if (routeObject != null && !_.isEmpty(routeObject[key])) {
        dispatch(getActionsMap()[key](routeObject[key]));
        return true;
    }
    return false;
}


function getDataModel(){
    return store.getState().dataModel;
}


/**
 * Created by roman_b on 2/2/2017.
 */
import {SET_ROUTE_LOCATION, APPLY_DEFAULT_ROUTE} from '../constants/ActionTypes';
import {getActionsMap, ACCEPTABLE_ROUTES,
    ACCEPTABLE_ROUTES_TEMPLATES, STATIC_ROUTES} from '../constants/RoutesToActionsMap';
import {selectMenuItem, selectSubMenuItem} from './menu';
import {CATEGORY_ID, SUB_CATEGORY_ID, CATEGORY, SUB_CATEGORY, ITEM_ID, SEARCH_PATTERN} from '../constants/PathKeys';
import _ from 'underscore';
import {matchRoute, getRouteParams} from '../utils/route-utils';
import {getSelectedGroup} from '../stores/finders/GroupFinder';
import {fetchItems, fetchSelectedItem} from './items';
import {getStore} from '../stores/app-store';
import ItemsGroup from '../stores/ItemsGroup';

export const setRouteLocation = function(pathname, params){
        let routeObj = matchRoute(pathname);
        let paramsObject = getRouteParams(params);
        return function(dispatch){
                const prevSelectedGroup = getSelectedGroup(getStore().getState());
                dispatchRouteState(dispatch, routeObj, CATEGORY_ID);
                dispatchRouteState(dispatch, routeObj, SUB_CATEGORY_ID);
                dispatchRouteState(dispatch, routeObj, SEARCH_PATTERN);
                dispatchRouteParamsState(dispatch, paramsObject);
                if (needToLoadItems(prevSelectedGroup) && !isItemSelection(routeObj)){
                    return dispatch(fetchItems(getDataModel().selectedGroupId, getDataModel().selectedSubGroupId))
                }
                if (isItemSelection(routeObj)){
                    return dispatch(fetchSelectedItem(routeObj[ITEM_ID]))
                }
                return Promise.resolve({});
        }
}

function needToLoadItems(prevSelectedGroup){
    let selectedGroup = getSelectedGroup(getStore().getState());
    return ItemsGroup.NULL != selectedGroup && !selectedGroup.isStatic && (_.isEmpty(selectedGroup.items))
}

function isItemSelection(routeObject){
    return routeObject != null && routeObject[ITEM_ID]
}

function dispatchRouteState(dispatch, routeObject, key){
    dispatchActionByKey(routeObject, dispatch)(key);
}

function dispatchRouteParamsState(dispatch, paramsObject){
    Object.keys(paramsObject).forEach(dispatchActionByKey(paramsObject, dispatch));
}

function dispatchActionByKey(routeObject, dispatch){
    return function(key){
        if (routeObject != null && !_.isEmpty(routeObject[key]))
            dispatch(getActionsMap()[key](routeObject[key]));
    }
}

function getDataModel(){
    return getStore().getState().dataModel;
}


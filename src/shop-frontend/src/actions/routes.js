/**
 * Created by roman_b on 2/2/2017.
 */
import {SET_ROUTE_LOCATION, APPLY_DEFAULT_ROUTE} from '../constants/ActionTypes';
import {actionsMap, ACCEPTABLE_ROUTES, ACCEPTABLE_ROUTES_TEMPLATES} from '../constants/RoutesToActionsMap';
import {selectMenuItem, selectSubMenuItem} from './menu';
import {CATEGORY_ID, SUB_CATEGORY_ID, CATEGORY, SUB_CATEGORY} from '../constants/PathKeys';
import _ from 'underscore';
import {getRouteObject} from '../utils/route-utils';
import {default as routeManager} from '../managers/RouteManager';

export const setRouteLocation = function(pathname){
        let result = getRouteObject(pathname);
        return function(dispatch){
            if (result){
                dispatchRouteState(dispatch, result, CATEGORY_ID) &&
                dispatchRouteState(dispatch, result, SUB_CATEGORY_ID)
            }
        }
}

function dispatchRouteState(dispatch, routeObject, key){
    if (!_.isEmpty(routeObject[key])) {
        dispatch(actionsMap[key](routeObject[key]));
        return true;
    }
    return false;
}


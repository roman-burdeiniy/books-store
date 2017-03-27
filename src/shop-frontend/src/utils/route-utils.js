/**
 * Created by roman_b on 2/22/2017.
 */
import {ACCEPTABLE_ROUTES} from '../constants/RoutesToActionsMap';
import Route from 'route-parser';
const queryString = require('query-string');

export const matchRoute = (inputPath)=>{
    let result = ACCEPTABLE_ROUTES.reduce((prev, path)=>{
        let routeObj = new Route(path).match(inputPath);
        routeObj = routeObj == false ? null : routeObj;
        return prev || routeObj;
    }, null);
    return result;
}


export const getRouteParams = (path)=>{
    const parsed = queryString.parse(path);
    return parsed;
}
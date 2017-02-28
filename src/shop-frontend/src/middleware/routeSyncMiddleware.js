/**
 * Created by roman_b on 2/23/2017.
 */

import R from 'ramda';
import {DATA_LOAD_ACTIONS} from '../constants/ActionTypes';
import {default as routeManager} from '../managers/RouteManager'

export const routeSyncMiddleware = (obj)=>(next)=>(action)=>{
    let applySync = R.cond([
        [R.complement(R.isNil), ()=>{
            let result = next(action);
            routeManager.initCurrentLocation();
            return result;
        }],
        [
            R.T, ()=>{
                return next(action);
            }
        ]
    ])
    return applySync(DATA_LOAD_ACTIONS.find(type => type === action.type));
}

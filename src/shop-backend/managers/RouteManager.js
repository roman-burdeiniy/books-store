/**
 * Created by roman_b on 3/20/2017.
 */
import {validateRoute} from './validators/route-validator';
import {setRouteLocation} from '../frontendSource/src/actions/routes'
import InvalidPathError from '../errors/InvalidPathError';

export default class RouteManager{

    applyRoute(route, store){
        return new Promise((success, reject) => {
            store.dispatch(setRouteLocation(route))
                .then((result) => {
                    success(store)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    validateRoute(url, store){
        const requestedRoute = url;
        const validatedRoute = validateRoute(url, store);
        if (requestedRoute == validatedRoute){
            return Promise.resolve({validRoute:requestedRoute, store});
        }
        throw new InvalidPathError(url, validatedRoute);
    }
}
/**
 * Created by roman_b on 2/21/2017.
 */
import { browserHistory } from 'react-router';
import {store} from '../stores/app-store';
import {setRouteLocation, setDefaultRouteLocation} from '../actions/routes'
import {validateRoute} from '../validators/route-validator';

class RouteManager{

    initCurrentLocation(){
        this.applyRoute(browserHistory.getCurrentLocation().pathname)
    }

    startListen(){
        browserHistory.listen((location) => {
            this.applyRoute(location.pathname);
        });
    }

    applyRoute(path){
        let prevRoute = browserHistory.getCurrentLocation().pathname;
        const route = validateRoute(path, store);
        if (prevRoute != route){
            this.eraseRoutePath();
        }else{
            store.dispatch(setRouteLocation(route));
        }
    }

    eraseRoutePath(){
        browserHistory.push('/');
    }
}

export default new RouteManager();
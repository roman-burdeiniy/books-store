/**
 * Created by roman_b on 2/21/2017.
 */

import {getStore} from '../stores/app-store';
import {setRouteLocation} from '../actions/routes'

var createHistory = null;
if(process.env.BROWSER) {
    createHistory  = require('history/createBrowserHistory').default;
}

class RouteManager{

    constructor(){
        if (createHistory != null){
            this.history = createHistory();
            this.history.listen(this.onLocationChange.bind(this));
        }
    }

    onLocationChange(location, action){
        getStore().dispatch(setRouteLocation(location.pathname, location.search));
    }

    push(location){
        this.history.push(location);
    }

    get location(){
        return this.history.location;
    }
}

export default new RouteManager();
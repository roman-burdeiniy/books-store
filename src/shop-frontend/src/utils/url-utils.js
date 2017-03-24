/**
 * Created by roman_b on 1/31/2017.
 */
import _ from 'underscore';
import getConfig from '../config/Config';

let getBaseURL = function(){
    return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
}

let getResourceURL = function(path){
    if (_.isEmpty(path))
        return null;
    return getConfig().apiEndpoint + path;
}


export {getBaseURL, getResourceURL};
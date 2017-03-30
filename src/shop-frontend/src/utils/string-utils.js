/**
 * Created by roman_b on 3/7/2017.
 */
import _ from 'underscore';

export function getLabel(separator = '', str){
    return str != null ? separator + str : '';
}

export function getDataDependentClassName(className, data){
    return function(toggleClass){
        toggleClass = toggleClass != null ? toggleClass : 'invisible';
        return _.isEmpty(data) && data != true ? `${className} ${toggleClass}` : `${className}`;
    }
}
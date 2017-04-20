/**
 * Created by roman_b on 4/19/2017.
 */
import _ from 'underscore';

export const addUniqueByKey = (map, key, item) => {
    if (map.hasOwnProperty(key) && !_.isEmpty(map[key])){
        map[key].push(item);
    }else{
        map[key] = [item];
    }
    return map;
}
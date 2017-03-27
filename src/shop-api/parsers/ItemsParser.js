/**
 * Created by roman_b on 3/3/2017.
 */
import _ from  'underscore';

export default class ItemsParser{

    parseItems(items){
        return items;
    }

    parseItemById(items){
        return !_.isEmpty(items) ? items[0] : [];
    }
}
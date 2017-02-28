/**
 * Created by roman_b on 2/3/2017.
 */
import _ from 'underscore';
import {getItemById} from '../utils/array-utils';
import {generateCategoryRoute} from '../constants/RoutesToActionsMap';

export default class MenuItem{
    constructor(id, name, localKey, children, img, disporder, isDefault){
        this._id = id;
        this.name = name;
        this.localKey = localKey;
        this.children = children;
        this.img = img;
        this.disporder = disporder;
        this.isDefault = isDefault;
    }

    getChildById(id){
        return getItemById(this.children, id);
    }

    hasChildren(){
        return !_.isEmpty(this.children)
    }

    getPath(){
        return !this.hasChildren() ? generateCategoryRoute(this._id) : '';
    }
}
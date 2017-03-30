/**
 * Created by roman_b on 2/3/2017.
 */
import _ from 'underscore';
import {getItemById} from '../utils/array-utils';
import {generateCategoryRoute} from '../constants/RoutesToActionsMap';
import {EXPANDED_CATEGORY} from '../constants/PathKeys';

export default class ItemsGroup{
    constructor(id, name, localKey, children, img, disporder, isDefault, items, isStatic){
        this._id = id;
        this.name = name;
        this.localKey = localKey;
        this.children = children;
        this.items = items;
        this.img = img;
        this.disporder = disporder;
        this.isDefault = isDefault;
        this.isStatic = isStatic;
    }

    getChildById(id){
        return getItemById(this.children, id);
    }

    hasChildren(){
        return !_.isEmpty(this.children)
    }

    getPath(){
        return !this.hasChildren() ? generateCategoryRoute(this._id) : `?${EXPANDED_CATEGORY}=${this._id}`;
    }

    static convert(obj){
        return Object.assign(new ItemsGroup(), obj)
    }
}

ItemsGroup.NULL = new ItemsGroup();
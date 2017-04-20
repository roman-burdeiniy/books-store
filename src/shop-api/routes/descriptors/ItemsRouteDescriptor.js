/**
 * Created by roman_b on 3/2/2017.
 */
import {getRouteDescriptor} from './BaseRouteDescriptor';
import ItemsService from '../../dataServices/ItemService';
import MongoDBProvider from '../../db/MongoDBProvider';

const service = new ItemsService(MongoDBProvider);

function getByCat(req, res, next){
    const catId = req.params.catId;
    return service.getByCategory(catId)
}

function getBySubCat(req, res, next){
    const catId = req.params.catId;
    const subCatId = req.params.subCatId;
    return service.getBySubCategory(catId, subCatId);
}

function getByIds(req, res, next){
    const ids = req.params.itemIds.split(',');
    return service.getItemsByIds(ids);
}

function getByPopular(req, res, next){
    return service.getPopular()
}

function getBySearchPattern(req, res, next){
    const searchPattern = req.params.pattern;
    return service.searchItems(searchPattern);
}

function getBySearchTag(req, res, next){
    const searchPattern = req.params.pattern;
    return service.searchItemsByTag(searchPattern);
}

function onError(res, err){
    this.__proto__.error(res, err);
    res.send({error: {message : 'Failed to get items list'}});
}

const byPopularExt = {
    path: '/items/popular',
    handler: getByPopular,
    error : onError
}

const byCategoryExt = {
    path: '/items/:catId',
    handler: getByCat,
    error : onError
}

const bySubCategoryExt = {
    path: '/items/:catId/:subCatId',
    handler: getBySubCat,
    error : onError
}

const getItemsByIdsExt = {
    path: '/item/:itemIds',
    handler: getByIds,
    error : onError
}

const bySearchPatternExt = {
    path: '/items/search/:pattern',
    handler: getBySearchPattern,
    error : onError
}

const bySearchTagExt = {
    path: '/items/pre_search/:pattern',
    handler: getBySearchTag,
    error : onError
}


export const getItemsByPopular = Object.setPrototypeOf(byPopularExt, getRouteDescriptor);
export const getItemsByCategory = Object.setPrototypeOf(byCategoryExt, getRouteDescriptor);
export const getItemsBySubCategory = Object.setPrototypeOf(bySubCategoryExt, getRouteDescriptor);
export const getItemsByIds = Object.setPrototypeOf(getItemsByIdsExt, getRouteDescriptor);
export const getItemsBySearchPattern = Object.setPrototypeOf(bySearchPatternExt, getRouteDescriptor);
export const getItemsBySearchTag = Object.setPrototypeOf(bySearchTagExt, getRouteDescriptor);
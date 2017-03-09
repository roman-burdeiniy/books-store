/**
 * Created by roman_b on 3/2/2017.
 */
import baseRouteDescriptor from './BaseRouteDescriptor';
import ItemsService from '../../dataServices/ItemService';
import MongoDBProvider from '../../db/MongoDBProvider';

const service = new ItemsService(new MongoDBProvider());

function getByCat(req, res, next){
    var catId = req.params.catId;
    return service.getByCategory(catId)
}

function getBySubCat(req, res, next){
    var catId = req.params.catId;
    var subCatId = req.params.subCatId;
    return service.getBySubCategory(catId, subCatId);
}

function getById(req, res, next){
    var itemId = req.params.itemId;
    return service.getItemById(itemId);
}

function getByPopular(req, res, next){
    return service.getPopular()
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

const getItemByIdExt = {
    path: '/item/:itemId',
    handler: getById,
    error : onError
}

export const getItemsByPopular = Object.setPrototypeOf(byPopularExt, baseRouteDescriptor);
export const getItemsByCategory = Object.setPrototypeOf(byCategoryExt, baseRouteDescriptor);
export const getItemsBySubCategory = Object.setPrototypeOf(bySubCategoryExt, baseRouteDescriptor);
export const getItemById = Object.setPrototypeOf(getItemByIdExt, baseRouteDescriptor);
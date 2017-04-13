/**
 * Created by roman_b on 3/3/2017.
 */
import {getRouteDescriptor} from './BaseRouteDescriptor';
import CategoriesService from '../../dataServices/CategoryService';
import MongoDBProvider from '../../db/MongoDBProvider';

const service = new CategoriesService(MongoDBProvider);

function getAll(req, res, next){
    return service.getAll();
}

function onError(res, err){
    this.__proto__.error(res, err);
    res.send({error: {message: 'Failed to get categories list'}});
}

const getAllExt = {
    path: '/categories',
    handler: getAll,
    error : onError
}


export const getAllCategories = Object.setPrototypeOf(getAllExt, getRouteDescriptor);
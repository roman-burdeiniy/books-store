/**
 * Created by roman_b on 4/11/2017.
 */
import {getRouteDescriptor, postRouteDescriptor} from './BaseRouteDescriptor';
import OrdersService from '../../dataServices/OrdersService';
import MongoDBProvider from '../../db/MongoDBProvider';

const service = new OrdersService(MongoDBProvider);

function onPlaceOrder(req, res, next){
    const order = req.body;
    return service.placeOrder(order)
}

function onError(res, err){
    this.__proto__.error(res, err);
    res.send({error: {message : 'Failed to place an order'}});
}

const postOrderExt = {
    path: '/orders',
    handler: onPlaceOrder,
    error : onError
}

export const placeOrder = Object.setPrototypeOf(postOrderExt, postRouteDescriptor);
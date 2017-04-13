/**
 * Created by roman_b on 4/11/2017.
 */
import ServiceBase from './ServiceBase';
import _ from 'underscore';
import ItemsParser from '../parsers/ItemsParser';
import * as shortId from 'shortid';

export default class OrdersService extends ServiceBase{
    constructor(dbProvider){
        super(dbProvider);
        this.dataParser = new ItemsParser();
    }

    placeOrder(order){
        if (_.isEmpty(order))
            return null;
        const collection = this.dbProvider.db.get('orders');
        return this.setUniqueKey(order, collection)
            .then(order => this.dbCallBuilder(collection, order)(this.addOrder, (insertedOrder) => insertedOrder))
    }

    setUniqueKey(order, collection){
        let result = new Promise((success, reject) => {
            this.checkIfKeyExists(success, reject, order, collection)
        })
        return result;
    }

    checkIfKeyExists(success, reject, order, collection){
        let key = this.getRandomKey();
        this.dbCallBuilder(collection, key)(this.getOrdersByKey, (items) => items)
            .then(items => {
                if (_.isEmpty(items)){
                    order.key = key;
                    success(order)
                }else{
                    return this.checkIfKeyExists(success, reject, order, collection);
                }
            })
            .catch(err => reject(err))
    }

    addOrder(collection, params){
        return collection.insert(params[0]);
    }

    getOrdersByKey(collection, params){
        return collection.find({key : params[0]});
    }

    getRandomKey() {
        const min = 10000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
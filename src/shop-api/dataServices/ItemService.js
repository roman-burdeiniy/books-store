/**
 * Created by roman_b on 3/2/2017.
 */
var ObjectID = require('mongodb').ObjectID;
import _ from 'underscore';
import ServiceBase from './ServiceBase';
import ItemsParser from '../parsers/ItemsParser';

export default class ItemsService extends ServiceBase{
    constructor(dbProvider){
        super(dbProvider);
        this.dataParser = new ItemsParser();
    }

    getItemById(id){
        if (id == null)
            return null;
        const collection = this.dbProvider.db.get('items');
        let result = this.dbCallBuilder(collection, id)(this.findItem, this.dataParser.parseItemById);
        return result
    }

    getByCategory(catId){
        if (catId == null)
            return null;
        const collection = this.dbProvider.db.get('items');
        let result = this.dbCallBuilder(collection, catId)(this.findByCategory,
            this.dataParser.parseItems);
        return result
    }

    getBySubCategory(catId, subCatId){
        if (catId == null || subCatId == null)
            return null;
        const collection = this.dbProvider.db.get('items');
        let result = this.dbCallBuilder(collection, catId, subCatId)(this.findBySubCategory,
            this.dataParser.parseItems);
        return result;
    }

    getPopular(){
        const collection = this.dbProvider.db.get('items');
        return this.dbCallBuilder(collection)(this.findPopulars, this.dataParser.parseItems);
    }

    findPopulars(collection){
        return  collection.find({isPopular : true})
    }

    findByCategory(collection, params){
        return  collection.find({parentIdsChain : {$eq: new ObjectID(params[0])}});
    }

    findBySubCategory(collection, params){
        return  collection.find({$and: [{parentIdsChain: {$eq : new ObjectID(params[0])}},
            {parentIdsChain: {$eq : new ObjectID(params[1])}}]});
    }

    findItem(collection, params){
        return collection.find({_id : new ObjectID(params[0])});
    }
}
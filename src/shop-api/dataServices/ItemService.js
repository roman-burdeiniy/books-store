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
        const collection = this.dbProvider.db.get('categories');
        let result = this.dbCallBuilder(collection, id)(this.findItem, this.dataParser.parseItemById.bind(this.dataParser));
        return result
    }

    getByCategory(catId){
        if (catId == null)
            return null;
        const collection = this.dbProvider.db.get('categories');
        let result = this.dbCallBuilder(collection, catId)(this.findCategory,
            this.dataParser.getFirstCategory(this.dataParser.parseCategoryItems));
        return result
    }

    getBySubCategory(catId, subCatId){
        if (catId == null || subCatId == null)
            return null;
        const collection = this.dbProvider.db.get('categories');
        let result = this.dbCallBuilder(collection, catId, subCatId)(this.findSubCategory,
            this.dataParser.getFirstCategory(this.dataParser.parseSubCategoryItems));
        return result;
    }

    getPopular(){
        const collection = this.dbProvider.db.get('categories');
        return this.dbCallBuilder(collection)(this.findPopulars, this.dataParser.parsePopulars.bind(this.dataParser));
    }

    findPopulars(collection){
        return  collection.find({$or : [{"subCategories.items" : {$elemMatch : {isPopular : true}}}, {items : {$elemMatch : {isPopular : true}}}]},
            {fields: {"subCategories.items" : 1, "items" : 1, "_id" : 0}})
    }

    findCategory(collection, params){
        return  collection.find({_id : new ObjectID(params[0])});
    }

    findSubCategory(collection, params){
        return collection.find({$and : [{_id : new ObjectID(params[0])}, {"subCategories._id" : new ObjectID(params[1])}]}, {fields: {"subCategories.$": 1}})
    }

    findItem(collection, params){
        return collection.find({$or : [{"items._id" : new ObjectID(params[0])}, {"subCategories.items._id" : new ObjectID(params[0])}]}, {fields : {"items" : 1, "subCategories.items" : 1}});
    }
}
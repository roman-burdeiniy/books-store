/**
 * Created by roman_b on 3/2/2017.
 */
var ObjectID = require('mongodb').ObjectID;
import _ from 'underscore';
import ServiceBase from './ServiceBase';
import ItemsParser from '../parsers/ItemsParser';
import {buildSearchTemplate} from '../managers/SearchManager';

export default class ItemsService extends ServiceBase{
    constructor(dbProvider){
        super(dbProvider);
        this.dataParser = new ItemsParser();
    }

    getItemsByIds(ids){
        if (_.isEmpty(ids))
            return null;
        const collection = this.dbProvider.db.get('items');
        let result = this.dbCallBuilder(collection, ...ids)(this.findItems, this.dataParser.parseItems);
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

    searchItems(searchPatterns){
        const collection = this.dbProvider.db.get('items');
        const wordsTmpt = searchPatterns.split(/\s+/);
        const searchTmpt = buildSearchTemplate(wordsTmpt);
        return this.dbCallBuilder(collection, searchTmpt)(this.searchByTextPattern, this.dataParser.parseSearchResults(wordsTmpt));
    }

    searchItemsByTag(searchPatterns){
        const collection = this.dbProvider.db.get('items');
        const wordsTmpt = searchPatterns.split(/\s+/);
        const searchTmpt = buildSearchTemplate(wordsTmpt, true);
        return this.dbCallBuilder(collection, searchTmpt)(this.searchByTag, this.dataParser.parseItems);
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

    findItems(collection, params){
        const ids = params.map(param => new ObjectID(param));
        return collection.find({_id : {$in : ids}});
    }

    searchByTextPattern(collection, params){
        return collection.find({$or: [{name: {$regex: params[0], $options: 'i'}},
            {author: {$regex: params[0], $options: 'i'}}, {publisher: {$regex: params[0], $options: 'i'}}]});
    }

    searchByTag(collection, params){
        return collection.find({searchTags: {$regex: params[0], $options: 'i'}});
    }

   /* db.items.find({$or : [{name: {$regex: '^(?=.*eng)(?=.*Murph).*$', $options: 'i'}},
        {author: {$regex: '^(?=.*eng)(?=.*Murph).*$', $options: 'i'}}]});*/

    //^(?=.*eng)(?=.*gram).*$
    //^(?=.*jack)(?=.*james).*$
    //^.*(eng).*(gram).*$
}
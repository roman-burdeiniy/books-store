/**
 * Created by roman_b on 3/3/2017.
 */
import _ from  'underscore';
import {buildSearchTemplate} from '../managers/SearchManager';

export default class ItemsParser{

    parseItems(items){
        return items;
    }

    parseSearchResults(wordsTmpt){
        return function(items){
            let firstMatchResults = items.filter(item => {
                const tester = new RegExp(buildSearchTemplate(wordsTmpt, true), 'i');
                return tester.test(this.getSearchableSource(item));
            });
            let filteredRemain = this.removeMatchedItems(items, firstMatchResults);
            let secondMatchResults = this.hasMatch(filteredRemain, wordsTmpt)('name');
            filteredRemain = this.removeMatchedItems(filteredRemain, secondMatchResults);
            let thirdMatchResults = this.hasMatch(filteredRemain, wordsTmpt)('author');
            filteredRemain = this.removeMatchedItems(filteredRemain, thirdMatchResults);
            let fourthMatchResults = this.hasMatch(filteredRemain, wordsTmpt)('publisher');
            filteredRemain = this.removeMatchedItems(filteredRemain, fourthMatchResults);
            let result = firstMatchResults.concat(secondMatchResults, thirdMatchResults, fourthMatchResults, filteredRemain);
            return result;
        }.bind(this)
    }

    hasMatch(items, wordsTmpt){
        return (propName) => {
            const tester = new RegExp(buildSearchTemplate(wordsTmpt), 'i');
            let result = items.filter(item => {
                return tester.test(item[propName]);
            })
            return result;
        }
    }

    removeMatchedItems(items, foundItems){
        return items.filter(item => foundItems.indexOf(item) == -1);
    }

    getSearchableSource(item){
        return `${item.name} ${item.author} ${item.publisher}`;
    }
}
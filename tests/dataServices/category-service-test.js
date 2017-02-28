/**
 * Created by roman_b on 1/16/2017.
 */
var expect = require('chai').expect;
import CategoryService from '../../src/shop-api/dataServices/CategoryService';
import MockDBProvider from '../mock/MockDBProvider';

describe('CategoryService', function() {
    it('getAll() should return all categories', function() {
        let service = new CategoryService(new MockDBProvider());
        return service.getAll().then(result =>{
            expect(result).to.exist;
            expect(result).to.have.lengthOf(2);
        });
    });
});


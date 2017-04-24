/**
 * Created by roman_b on 1/31/2017.
 */
import reducer from '../../src/reducers/selected-category'
import {LOAD_CATEGORIES_SUCCESS} from '../../src/constants/ActionTypes'
import MockData from '../../../../../books-store-api/data/scripts/mock-data';

let mockData;

/*
describe('selectedCategory reducer', () => {

    beforeEach(() => {
        mockData = new MockData();
    })
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(null);
    })

    it('should return first category', () => {
        let action = {type: LOAD_CATEGORIES_SUCCESS, payload: mockData.categories};
        let store = reducer(undefined, action);
        expect(store).not.toEqual(null);
        expect(store).toBe(mockData.categories[0]);
    })
});*/

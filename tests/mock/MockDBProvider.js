/**
 * Created by roman_b on 1/16/2017.
 */
var MockData = require('../../data/scripts/mock-data');

class MockCollection{

    constructor(colName){
        let data = new MockData();
        this.collection = data[colName];
    }

    find(query){
        let promise = new Promise((success, reject)=>{
            setTimeout(()=>{
                success(this.collection);
            }, 300);

        });
        return promise;
    }
}
class MockDB{
    get(collectionName){
        return new MockCollection(collectionName);
    }
}

class MockDBProvider {

    constructor() {
        this.db = new MockDB();
    }
}

export default MockDBProvider;

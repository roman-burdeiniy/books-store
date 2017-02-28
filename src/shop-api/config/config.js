/**
 * Created by roman_b on 1/5/2017.
 */
import path from 'path';
import {_extend} from 'util';

import * as devConf from './env/dev';
import * as testConf from './env/test';
import * as prodConf from './env/prod';

class Config{
    constructor(){
        this.init();
    }

    init(){
        let defaults = {root: path.normalize(__dirname + '/..')};
        this.dev = _extend(devConf, defaults);
        this.test = _extend(testConf, defaults);
        this.prod = _extend(prodConf, defaults);
    }
}

export default new Config()[process.env.NODE_ENV || "dev"];


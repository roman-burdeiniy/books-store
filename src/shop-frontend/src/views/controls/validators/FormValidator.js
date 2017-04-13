/**
 * Created by roman_b on 4/7/2017.
 */
import _ from 'underscore';
import * as R from 'ramda';

export default class FormValidator{
    constructor(intl){
        this.intl = intl;
    }

    required(){
        return function(value){
            return !_.isEmpty(value) ? undefined :
                this.intl.formatMessage({id:"validation.form.required", defaultMessage: "Required"});
        }.bind(this);
    }

    email(){
        return function(value){
            return  !_.isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
                this.intl.formatMessage({id:"validation.form.email", defaultMessage: "Invalid email address"}) : undefined;
        }.bind(this);
    }

    phone(){
        return function(value){
            return  !_.isEmpty(value) && !/^\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value) ?
                this.intl.formatMessage({id:"validation.form.phone", defaultMessage: "Invalid phone number. (Use format: (099)999-99-99"}) : undefined;
        }.bind(this);
    }

    normalizePhone() {
        return function (value, previousValue){
            if (!value) {
                return value
            }
            let onlyNums = value.replace(/[^\d]/g, '');
            if (onlyNums == '')
                return '';
            if (!previousValue || value.length > previousValue.length) {
                // typing forward
                if (onlyNums.length === 1) {
                    return '(' + onlyNums;
                }
                if (onlyNums.length === 3) {
                    return '(' + onlyNums + ')'
                }
            }

            if (onlyNums.length <= 3) {
                return '(' + onlyNums;
            }
            if (onlyNums.length <= 6) {
                return this.code(onlyNums) + onlyNums.slice(3)
            }
            if (onlyNums.length <= 8) {
                return this.code(onlyNums) + this.firstPart(onlyNums) + '-' + onlyNums.slice(6);
            }
            if (onlyNums.length <= 10) {
                return this.code(onlyNums) + this.firstPart(onlyNums) + '-' + this.secondPart(onlyNums) + '-' + onlyNums.slice(8);
            }
            return this.code(onlyNums) + this.firstPart(onlyNums) + '-' + this.secondPart(onlyNums) + '-' + this.thirdPart(onlyNums)
        }.bind(this)
    }

    code(onlyNums){
        return '(' + onlyNums.slice(0, 3) + ')';
    }

    firstPart(onlyNums){
        return onlyNums.slice(3, 6);
    }

    secondPart(onlyNums){
        return onlyNums.slice(6, 8);
    }

    thirdPart(onlyNums){
        return onlyNums.slice(8, 10);
    }
}


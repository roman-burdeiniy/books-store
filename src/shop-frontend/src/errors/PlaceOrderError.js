/**
 * Created by roman_b on 4/11/2017.
 */
import {PLACE_ORDER_ERROR} from '../constants/ErrorCodes';

export default class PlaceOrderError{
    constructor(order){
        this.id = PLACE_ORDER_ERROR;
        this.messageDescriptor = {key: 'error.details.place_order', default:'Seems we got troubles while processing your order.'};
        this.order = order;
    }
}
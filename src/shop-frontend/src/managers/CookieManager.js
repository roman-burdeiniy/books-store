/**
 * Created by roman_b on 3/31/2017.
 */
import cookie from 'react-cookie';
import {getStore} from '../stores/app-store';

class CookieManager{
    saveOrderCart(){
        const orderItems = this.cart.items.map(orderPosition => (
            {id : orderPosition.item._id , quantity : orderPosition.quantity}));
        const jsonList = JSON.stringify(orderItems);
        cookie.save('items_in_cart', jsonList, { path: '/' });
    }

    eraseOrderCart(){
        cookie.remove('items_in_cart');
    }

    get cart(){
        return getStore().getState().cart;
    }
}

export default new CookieManager();
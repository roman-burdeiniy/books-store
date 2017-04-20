/**
 * Created by roman_b on 3/31/2017.
 */
import cookie from 'react-cookie';
import {getStore} from '../stores/app-store'
import {getCartMap} from '../reducers/cart';

class CookieManager{
    saveOrderCart(){
        const jsonList = JSON.stringify(getCartMap(this.cart));
        cookie.save('items_in_cart', jsonList, { path: '/' });
    }

    eraseOrderCart(){
        cookie.remove('items_in_cart', { path: '/' });
    }

    get cart(){
        return getStore().getState().cart;
    }
}

export default new CookieManager();
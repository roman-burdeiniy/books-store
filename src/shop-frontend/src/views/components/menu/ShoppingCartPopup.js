/**
 * Created by roman_b on 3/13/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';

export const ShoppingCartPopup = (props) => {
    return <section className={props.isActive ? 'shopping-cart-popup' : 'invisible'} >
        <section className="shopping-cart-popup-holder">
            <p className="empty-cart-label">{getLocalizedLabel('shopping.cart.empty', 'Your cart is empty')}</p>
        </section>
    </section>
}
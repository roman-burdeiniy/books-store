/**
 * Created by roman_b on 3/13/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {ShoppingCartItem} from './ShoppingCartItem';
import _ from 'underscore';
import {getDataDependentClassName} from '../../../utils/string-utils';

export const ShoppingCartPopup = (props, context) => {
    return <section className={getDataDependentClassName('shopping-cart-popup', props.isActive)('hidden')}>
        <section className="mouse-over-area"
            onMouseOver={props.onMouseOver}>
            <section className="shopping-cart-popup-holder">
                <p className={_.isEmpty(props.cart.items) ? `cart-label empty` : 'cart-label'}>
                    {_.isEmpty(props.cart.items) ? getLocalizedLabel('shopping.cart.empty', 'Your cart is empty') :
                        `${context.intl.formatMessage({id:"shopping.cart.items_in_cart", defaultMessage: "Items in cart:"})} ${props.cart.totalCount}`}
                </p>
                <ul>
                    {props.cart.items.map((item) =>{
                        return <ShoppingCartItem
                            data={item}
                            removeItem={props.removeItem}
                            key={item.item._id}/>
                    })
                    }
                </ul>
                <hr className={getDataDependentClassName('divider', props.cart.items)()}/>
                <section className={getDataDependentClassName('subtotal-holder', props.cart.items)()}>
                    {getLocalizedLabel('shopping.cart.subtotal', 'Subtotal')}
                    <span className="subtotal-price">{props.cart.totalPrice}{getLocalizedLabel('currency', 'UAH')}</span>
                </section>
                <section className={getDataDependentClassName('buttons-holder', props.cart.items)()}>
                    <section className="control-button" onClick={props.onCheckout}>{getLocalizedLabel('shopping.cart.checkout', 'Checkout')}</section>
                </section>
            </section>
        </section>
    </section>
}


ShoppingCartPopup.contextTypes = {intl: React.PropTypes.object};
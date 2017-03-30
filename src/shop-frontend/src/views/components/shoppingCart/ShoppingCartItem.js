/**
 * Created by roman_b on 3/28/2017.
 */
import React from 'react';
import _ from 'underscore';
import {getResourceURL} from '../../../utils/url-utils';
import {NO_BOOK_LOGO_URL} from '../../../constants/Imgs';
import {getLocalizedLabel, getLocalizedHTMLLabel} from '../../../utils/localization-util';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/shopping-cart-item.less');
}

export const ShoppingCartItem = (props) => {
    return <section className='shopping-cart-item'>
                <hr className="divider"/>
                <section className='shopping-cart-item-holder'>
                    <section className="image-holder">
                        <img src={getResourceURL(getImgURL(props))} className="item-image"/>
                    </section>
                    <section className="item-details">
                        <section className="item-name">
                            {props.data.item.name}
                        </section>
                        <section className="item-summary">
                            {getLocalizedHTMLLabel("shopping.cart.itms_quantity", "Qty:", {quantity : props.data.quantity})}
                            <section className="price-label">
                                <span>{props.data.item.price}</span>
                                {getLocalizedLabel('currency', 'UAH')}
                            </section>
                        </section>
                    </section>
                    <section className="remove-item">
                        <section className="remove-item-button"/>
                    </section>
                </section>
        </section>
}

function getImgURL(props){
    return props.data.item.logo != null ? props.data.item.logo : NO_BOOK_LOGO_URL;
}
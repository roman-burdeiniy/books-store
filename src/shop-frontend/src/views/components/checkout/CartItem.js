/**
 * Created by roman_b on 3/30/2017.
 */
import React from 'react';
import {getResourceURL} from '../../../utils/url-utils';
import {getLogoURL} from '../../../utils/image-utils';
import {getLocalizedLabel, getLocalizedHTMLLabel} from '../../../utils/localization-util';
import {QuantityBox} from '../../controls/QuantityBox';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/checkout/cart-item.less');
    require('../../../../resources/styles/common/shopping-cart-item-base.less');
}

export default class CartItem extends React.Component{
    render(){
        return <section className="cart-item">
                <section className="cart-item-holder">
                    <section className="image-holder">
                        <img src={getResourceURL(getLogoURL(this.item))} className="item-image"/>
                    </section>
                    <section className="item-details">
                        <section className="item-title">{this.getBookTitle()}</section>
                        <section className="bottom-block">
                            <section className="item-full-name">{this.item.fullName}</section>
                            <section className="item-author">{getLocalizedLabel('book.info.author_title', 'by')}&nbsp;{this.item.author}</section>
                        </section>
                    </section>
                    <section className="item-counter">
                        <QuantityBox
                            onQuantityChange={this.onQuantityChange.bind(this)}
                            quantity={this.props.data.quantity}/>
                    </section>
                    <section className="item-price">
                        <section className="price-label">
                            <span>{this.item.price}</span>
                            {getLocalizedLabel('currency', 'UAH')}
                        </section>
                    </section>
                    <section className="remove-item">
                        <section className="remove-item-button"/>
                    </section>
                </section>
                <hr className="divider"/>
        </section>
    }

    get item(){
        return this.props.data.item;
    }

    getBookTitle(){
        return [this.item.name, this.item.edition,
            this.item.year].filter(item => item != null).join(', ');
    }

    onQuantityChange(quantity){
        this.props.onQuantityChange({id: this.item._id, quantity});
    }

}
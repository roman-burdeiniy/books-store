/**
 * Created by roman_b on 3/1/2017.
 */
import React from 'react';
import _ from 'underscore';
import {getResourceURL} from '../../../utils/url-utils';
import {getMainImageURL} from '../../../utils/image-utils';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {getLabel} from '../../../utils/string-utils';
import {NO_BOOK_MAIN_IMG_URL} from '../../../constants/Imgs';
import BookInfoTabsView from './BookInfoTabsView';
import {getDataDependentClassName} from '../../../utils/string-utils';
import {QuantityBox} from '../../controls/QuantityBox';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/itemDetails/book-details-view.less');
}

export class BookDetailsView extends React.Component{

    constructor(props){
        super(props);
        this.state = {quantity: 1};
    }

    render(){
        if (this.props.book == null){
            return null;
        }
        return <section className="book-details-view">
            <section className="book-details-bg"/>
            <section className="details-holder">
                <section className="images-holder">
                    <section className="full-image-section css3-shadow">
                        <img src={getResourceURL(getMainImageURL(this.props.book))} className="book-details-full-image"/>
                    </section>
                </section>
                <section className="info-holder">
                    <section className="book-name">{this.props.book.name}</section>
                    <section className="book-details">{this.getBookTitle(this.props)}</section>
                    <section className="publisher-holder">{this.props.book.publisher}, {this.props.book.year}</section>
                    <section className="author-holder">{getLocalizedLabel('book.info.author_title', 'by')}&nbsp;{this.props.book.author}</section>
                    <hr className="divider"/>
                    {this.orderHolder(this.props)}
                    {this.addToCartHolder(this.props)}
                    <BookInfoTabsView book={this.props.book}/>
                </section>
            </section>
        </section>
    }

     orderHolder(props){
        return  <section className="order-holder">
            <section className="box-holder">
                <section className="control-title-label">{getLocalizedLabel('book.details.price', 'Price')}</section>
                <section className="price-label">{props.book.price}{this.getCurrency()}</section>
            </section>
            <section className="box-holder">
                <section className="control-title-label">{getLocalizedLabel('book.details.quantity', 'Quantity')}</section>
                <QuantityBox
                    onQuantityChange={(quantity) => this.setState({quantity})}
                    quantity={this.state.quantity}/>
            </section>
        </section>
    }

     addToCartHolder(props){
        return <section className="add-to-cart-holder">
            <section className="total-price-holder">
                <section className="control-title-label">{getLocalizedLabel('book.details.totalPrice', 'Total price')}</section>
                <section className="price-label">{this.calculateTotalPrice(props)}{this.getCurrency()}</section>
            </section>
            <section className="add-button-holder">
                <section className={getDataDependentClassName("control-button", props.isInCart)()}
                         onClick={this.onCheckout.bind(this)}>
                    {getLocalizedLabel('shopping.cart.checkout', 'Checkout')}
                </section>
                <section className="control-button" onClick={this.onAddToCart.bind(this)}>
                    {getLocalizedLabel('book.details.addToCart', 'Add to Cart')}
                </section>
            </section>
        </section>
    }

    onAddToCart(){
        this.props.onAddToCart(this.props.book, this.state.quantity);
    }

    onCheckout(){
        this.props.onCheckout();
    }

     calculateTotalPrice(){
        return Number(this.props.book.price) * Number(this.state.quantity);
    }

    getCurrency(){
        return getLocalizedLabel('currency', 'UAH');
    }

    getBookTitle(props){
        return [props.book.fullName, props.book.edition].filter(item => item != null).join(' ,');
    }
}




export default BookDetailsView;
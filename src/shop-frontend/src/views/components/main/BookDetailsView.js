/**
 * Created by roman_b on 3/1/2017.
 */
import React from 'react';
import _ from 'underscore';
import {getResourceURL} from '../../../utils/url-utils';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {getLabel} from '../../../utils/string-utils';
import {NO_BOOK_MAIN_IMG_URL} from '../../../constants/Imgs';
import BookInfoTabsView from './BookInfoTabsView';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/book-details-view.less');
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
                        <img src={getResourceURL(this.getImgURL())} className="book-details-full-image"/>
                    </section>
                </section>
                <section className="info-holder">
                    <section className="book-name">{this.props.book.name}</section>
                    <section className="book-details">{this.getBookTitle(this.props)}</section>
                    <section className="publisher-holder">{this.props.book.publisher}, {this.props.book.year}</section>
                    <section className="author-holder">by {this.props.book.author}</section>
                    <hr className="divider"/>
                    {this.orderHolder(this.props)}
                    {this.addToCartHolder(this.props)}
                    <BookInfoTabsView book={this.props.book}/>
                </section>
            </section>
        </section>
    }

    quantityBox(props){
        return <section className="quantity-box">
            <input ref="quantity" onChange={this.onQuantityChange.bind(this)} value={this.state.quantity}/>
            <section className="control-button minus-button" onClick={this.onQuantityMinus.bind(this)}>-</section>
            <section className="control-button plus-button" onClick={this.onQuantityPlus.bind(this)}>+</section>
        </section>

    }

    onQuantityMinus(){
        let newValue = this.state.quantity > 1 ? this.state.quantity - 1 : this.state.quantity
        this.setState({...this.state, quantity : newValue})
    }

    onQuantityPlus(){
        let newValue = this.state.quantity + 1;
        this.setState({...this.state, quantity : newValue})
    }

     orderHolder(props){
        return  <section className="order-holder">
            <section className="box-holder">
                <section className="control-title-label">{getLocalizedLabel('book.details.price', 'Price')}</section>
                <section className="price-label">{props.book.price}{this.getCurrency()}</section>
            </section>
            <section className="box-holder">
                <section className="control-title-label">{getLocalizedLabel('book.details.quantity', 'Quantity')}</section>
                {this.quantityBox(props)}
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
                <section className="add-button" onClick={this.onAddToCart.bind(this)}>
                    {getLocalizedLabel('book.details.addToCart', 'Add to Cart')}
                </section>
            </section>
        </section>
    }

    onAddToCart(){
        this.props.onAddToCart(this.props.book, this.state.quantity);
    }

    getImgURL(){
        let imgURL = this.getFirstImg(this.props.book);
        return imgURL != null ? imgURL : NO_BOOK_MAIN_IMG_URL;
    }

     calculateTotalPrice(){
        return Number(this.props.book.price) * Number(this.state.quantity);
    }

    onQuantityChange(ev){
        this.setState({quantity: ev.target.value});
    }

    getCurrency(){
        return getLocalizedLabel('currency', 'UAH');
    }

    getFirstImg(book){
        return !_.isEmpty(book.imgs) ? book.imgs[0] : null;
    }

    getBookTitle(props){
        return [props.book.fullName, props.book.edition].filter(item => item != null).join(' ,');
    }
}




export default BookDetailsView;
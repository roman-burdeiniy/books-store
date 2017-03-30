/**
 * Created by roman_b on 3/1/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BookDetailsView from '../../components/itemDetails/BookDetailsView';
import {addItemToCart, checkout} from '../../../actions/cart';

const mapStateToProps = function(state) {
    return {selectedBook : state.dataModel.selectedItem,
        cartItems : state.cart.items}
}

const mapDispatchToProps = function(dispatch){
    return {
        addBookToCart : (book, quantity) => dispatch(addItemToCart(book, quantity)),
        checkout : () => dispatch(checkout())
    }
}

class BookDetailsViewContainer extends React.Component{
        render(){
            return <BookDetailsView
                onAddToCart={this.props.addBookToCart}
                onCheckout={this.props.checkout}
                isInCart={this.isItemInCart()}
                book={this.props.selectedBook}/>
        }

    isItemInCart(){
       let result = this.props.cartItems.filter(item => item.item._id == this.props.selectedBook._id)
       return result.length > 0;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsViewContainer);
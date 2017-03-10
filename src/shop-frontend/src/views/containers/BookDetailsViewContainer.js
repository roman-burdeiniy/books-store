/**
 * Created by roman_b on 3/1/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BookDetailsView from '../components/main/BookDetailsView';
import {addItemToCart} from '../../actions/cart';

const mapStateToProps = function(state) {
    return {selectedBook : state.dataModel.selectedItem}
}

const mapDispatchToProps = function(dispatch){
    return {
        addBookToCart : (book, quantity) => dispatch(addItemToCart(book, quantity))
    }
}

class BookDetailsViewContainer extends React.Component{
        render(){
            return <BookDetailsView
                onAddToCart={this.props.addBookToCart}
                book={this.props.selectedBook}/>
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsViewContainer);
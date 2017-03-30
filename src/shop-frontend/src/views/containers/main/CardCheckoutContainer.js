/**
 * Created by roman_b on 3/29/2017.
 */
import {connect} from 'react-redux';
import React from 'react';
import {PageContainerBase, baseMapStateToProps} from './PageContainerBase';
import CheckoutView from '../../components/main/CheckoutView';

const mapStateToProps = function(state) {
    return {cart : state.cart};
}

class CardCheckoutContainer extends React.Component {
    render(){
        return <CheckoutView
            cart={this.props.cart}/>
    }
}

export default connect(mapStateToProps)(CardCheckoutContainer);
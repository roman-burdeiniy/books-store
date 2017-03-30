/**
 * Created by roman_b on 3/30/2017.
 */
import ShoppingCart from '../../components/shoppingCart/ShoppingCart';
import {checkout} from '../../../actions/cart';
import {connect} from 'react-redux';

const mapDispatchToProps = function(dispatch){
    return {
        onCheckout: function(){
            dispatch(checkout());
        }
    }
}

export default connect(state => ({cart : state.cart}), mapDispatchToProps)(ShoppingCart)
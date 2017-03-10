/**
 * Created by roman_b on 3/10/2017.
 */
import React from 'react';
import '../../../../resources/styles/components/shopping-cart.less';
import {getLocalizedLabel} from '../../../utils/localization-util';

export default class ShoppingCart extends React.Component{

    constructor(props){
        super(props);
    }

    static get defaultProps() {
        return {
            itemsCount: '0'
        }
    }

    render(){
        return <button className="shopping-cart-button">
            <section className="shopping-cart-button_bg-image">
                <span className="items-count">{this.props.itemsCount}</span>
            </section>
        </button>
    }
}
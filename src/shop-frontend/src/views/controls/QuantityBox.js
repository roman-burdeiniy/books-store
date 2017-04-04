/**
 * Created by roman_b on 3/30/2017.
 */
import React from 'react'

if(process.env.BROWSER) {
    require('../../../resources/styles/controls/quantity-box.less');
}

export const QuantityBox = (props)=> {
    return <section className="quantity-box">
        <input onChange={onQuantityChange(props)} value={props.quantity}/>
        <section className="control-button minus-button" onClick={onQuantityMinus(props)}>-</section>
        <section className="control-button plus-button" onClick={onQuantityPlus(props)}>+</section>
    </section>
}

const onQuantityChange = (props) => (ev) =>  {
        props.onQuantityChange(ev.target.value);
    }

const onQuantityMinus = (props) => (ev)=> {
    let newValue = props.quantity > 1 ? props.quantity - 1 : props.quantity;
    props.onQuantityChange(newValue);
}

const onQuantityPlus = (props) => (ev)=>{
    let newValue = props.quantity + 1;
    props.onQuantityChange(newValue);
}

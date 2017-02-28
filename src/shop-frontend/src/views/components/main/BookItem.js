/**
 * Created by roman_b on 2/6/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import {getResourceURL} from '../../../utils/url-utils';

import '../../../../resources/styles/components/book-item.less';

export default class BookItem extends React.Component{
    render(){
        return <li className="book-item" key={this.props.data._id}>
                <section className="book-item-content-holder">
                    <Link className="book-image-link" onClick={this.onLinkClick.bind(this)}>
                        <section className="image-holder">
                            <img src={getResourceURL(this.props.data.img)} className="items-list-book-image"/>
                        </section>
                    </Link>
                    <section className="book-details">
                        <Link className="book-name-link" onClick={this.onLinkClick.bind(this)}>
                            <div title={this.props.data.name}>{this.props.data.name}</div>
                        </Link>
                        <span title={this.props.data.author} className="author-box">{this.props.data.author}</span>
                        <section className="price-box">{this.props.data.price}&#8372;</section>
                    </section>
                </section>
            </li>
    }

    onLinkClick(event){
        event.preventDefault();
        var el = ReactDOM.findDOMNode(this);
        var event = new CustomEvent('bookItemClick', {bubbles: true, detail: {id : this.props.data._id}});
        el.dispatchEvent(event);
    }
}
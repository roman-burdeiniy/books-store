/**
 * Created by roman_b on 2/6/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {getResourceURL} from '../../../utils/url-utils';
import {getLogoURL} from '../../../utils/image-utils';
import {getLocalizedLabel} from '../../../utils/localization-util';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/book-item.less');
}

export default class BookItem extends React.Component{
    render(){
        return <li className="book-item" key={this.props.data._id}>
                <section className="book-item-content-holder">
                    <Link className="book-image-link" to={`/item/${this.props.data._id}`}>
                        <section className="image-holder">
                            <img src={getResourceURL(getLogoURL(this.props.data))} className="items-list-book-image"/>
                        </section>
                    </Link>
                    <section className="book-details">
                        <Link className="book-name-link" to={`/item/${this.props.data._id}`}>
                            <div title={this.props.data.name}>{this.props.data.name}</div>
                        </Link>
                        <span title={this.props.data.author} className="author-box">{this.props.data.author}</span>
                        <section className="price-box">{this.props.data.price} {getLocalizedLabel('currency', 'UAH')}</section>
                    </section>
                </section>
            </li>
    }
}
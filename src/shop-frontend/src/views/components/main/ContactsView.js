/**
 * Created by roman_b on 2/1/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/main/page-view.less');
    require('../../../../resources/styles/components/main/contacts-view.less');
}

export default class ContactsView extends React.Component{
    render(){
        return <section className="page-view contacts-view">
            <section className="page-view_header">
                <h1>{getLocalizedLabel(this.props.headerNameKey, this.props.headerDefaultName)}</h1>
            </section>
        </section>
    }
}
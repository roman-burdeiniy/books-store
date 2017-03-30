/**
 * Created by roman_b on 3/30/2017.
 */
import {connect} from 'react-redux';
import React from 'react';
import {PageContainerBase, baseMapStateToProps} from './PageContainerBase';
import ContactsView from '../../components/main/ContactsView';

class ContactsContainer extends PageContainerBase {
    render() {
        return (<ContactsView headerDefaultName={this.getHeaderDefaultName()}
                               headerNameKey={this.getHeaderNameKey()}
                               data={this.getData()}/>);
    }
}

export default connect(baseMapStateToProps)(ContactsContainer);
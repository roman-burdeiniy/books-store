/**
 * Created by roman_b on 3/13/2017.
 */
require('array.prototype.find').shim();

import React from 'react';
import { Provider } from 'react-redux'
import MainView from './views/MainView';
import BooksListContainer from './views/containers/main/BooksListContainer';
import BookDetailsViewContainer from './views/containers/book/BookDetailsViewContainer'
import ContactsContainer from './views/containers/main/ContactsContainer'
import CardCheckoutContainer from './views/containers/main/CardCheckoutContainer';
import OrderConfirmedViewContainer  from './views/containers/order/OrderConfirmedViewContainer';
import ErrorContainer from './views/containers/error/ErrorContainer';
import ConnectedIntlProvider from './providers/ConnectedIntlProvider';
import SelectedGroupItemsFinder from './stores/finders/SelectedGroupItemsFinder';
import SelectedGroupDataFinder from './stores/finders/SelectedGroupDataFinder';
import SearchResultItemsFinder from './stores/finders/SearchResultItemsFinder';
import {addLocaleData} from 'react-intl';
import {initConfig} from './config/Config';

import {Route, Switch} from 'react-router-dom'

import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

if(process.env.BROWSER) {
    require( './../resources/styles/index.less');
    require( './../resources/styles/common/fonts.less');
    require( 'normalize.css');
}

export default class App extends React.Component {
    constructor(props){
        super(props);
        addLocaleData([...en, ...ru]);
    }

    render(){
        return <Provider store={this.props.store}>
            <ConnectedIntlProvider>
                <MainView>
                    <Switch>
                        <Route path="/cat/popular"
                               render={this.renderBooksList()}/>
                        <Route path="/cat/contacts"
                               render={this.renderContacts}/>
                        <Route path="/cat/:id/subCat/:id"
                               render={this.renderBooksList()}/>
                        <Route path="/item/:id"
                               component={BookDetailsViewContainer}/>
                        <Route path="/checkout/cart"
                               component={CardCheckoutContainer}/>
                        <Route path="/checkout/order/:key"
                               component={OrderConfirmedViewContainer}/>
                        <Route path="/items/search/:key"
                               render={this.renderBooksList(new SearchResultItemsFinder())}/>
                        <Route path="/error"
                               component={ErrorContainer}/>
                        <Route render={this.renderBooksList()}/>
                    </Switch>
                </MainView>
            </ConnectedIntlProvider>
        </Provider>
    }

    renderBooksList(finderStrategy = new SelectedGroupItemsFinder()){
        return function (props){
            return <BooksListContainer  finder={finderStrategy}/>
        }
    }

    renderContacts(props){
        return <ContactsContainer {...props}
            finder={new SelectedGroupDataFinder()}/>
    }
}

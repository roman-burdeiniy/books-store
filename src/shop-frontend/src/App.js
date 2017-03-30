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
import ConnectedItnlProvider from './providers/ConnectedItnlProvider';
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
            <ConnectedItnlProvider>
                <MainView>
                    <Switch>
                        <Route path="/cat/popular"
                               component={BooksListContainer}/>
                        <Route path="/cat/contacts"
                               component={ContactsContainer} />
                        <Route path="/cat/:id/subCat/:id"
                               component={BooksListContainer}/>
                        <Route path="/item/:id"
                               component={BookDetailsViewContainer}/>
                        <Route path="/checkout/cart"
                               component={CardCheckoutContainer}/>
                        <Route component={BooksListContainer}/>
                    </Switch>
                </MainView>
            </ConnectedItnlProvider>
        </Provider>
    }
}

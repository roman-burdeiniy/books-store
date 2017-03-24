/**
 * Created by roman_b on 3/13/2017.
 */
require('array.prototype.find').shim();

import React from 'react';
import { Provider } from 'react-redux'
import MainView from './views/MainView';
import BooksListContainer from './views/containers/BooksListContainer';
import BookDetailsViewContainer from './views/containers/BookDetailsViewContainer'
import ContactsView from './views/components/main/ContactsView'
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
                        <Route path="cat/popular"
                               component={BooksListContainer}/>
                        <Route path="cat/contacts"
                               component={ContactsView} />
                        <Route path="cat/:id"
                               component={BooksListContainer}/>
                        <Route path="cat/:id/subCat/:id"
                               component={BooksListContainer}/>
                        <Route path="/item/:id"
                               component={BookDetailsViewContainer}/>
                        <Route component={BooksListContainer}/>
                    </Switch>
                </MainView>
            </ConnectedItnlProvider>
        </Provider>
    }
}
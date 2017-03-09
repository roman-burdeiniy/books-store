/**
 * Created by roman_b on 1/17/2017.
 */
/**
 * Created by roman_b on 12/8/2016.
 */
require('array.prototype.find').shim();

import React from 'react';
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './views/App';
import BooksListContainer from './views/containers/BooksListContainer';
import BookDetailsViewContainer from './views/containers/BookDetailsViewContainer'
import ContactsView from './views/components/main/ContactsView'
import {store} from './stores/app-store';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {addLocaleData} from 'react-intl';
import ConnectedItnlProvider from './providers/ConnectedItnlProvider';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import './../resources/styles/index.less';
import './../resources/styles/common/fonts.less';
import 'normalize.css';

import * as FindSelectedGroupStrategy from './stores/finders/FindSelectedGroupStrategy';

addLocaleData([...en, ...ru]);

render(
    <Provider store={store}>
        <ConnectedItnlProvider>
            <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <Route path="cat/popular"
                               component={BooksListContainer}
                               findStrategy={FindSelectedGroupStrategy}/>
                        <Route path="cat/contacts"
                               component={ContactsView} />
                        <Route path="cat/:id"
                               component={BooksListContainer}
                               findStrategy={FindSelectedGroupStrategy}/>
                        <Route path="cat/:id/subCat/:id"
                               component={BooksListContainer}
                               findStrategy={FindSelectedGroupStrategy}/>
                        <Route path="cat/:id/subCat/:id/item/:id"
                               component={BookDetailsViewContainer}/>
                        <Route path="cat/:id/item/:id"
                               component={BookDetailsViewContainer}/>
                        <IndexRoute component={BooksListContainer}
                                    findStrategy={FindSelectedGroupStrategy}/>
                    </Route>
            </Router>
        </ConnectedItnlProvider>
    </Provider>,
    document.getElementById('root')
)




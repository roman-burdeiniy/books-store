/**
 * Created by roman_b on 1/17/2017.
 */
import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Router} from 'react-router';
import {buildStore} from './stores/app-store';
import RouteManager from './managers/RouteManager';

const preloadedState = window.__PRELOADED_STATE__;

render(<Router history={RouteManager.history}>
            <App store={buildStore(preloadedState)}/>
       </Router>, document.getElementById('root'));




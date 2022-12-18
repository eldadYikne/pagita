import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';
import App from './root-cmp';
import { store } from './store/store'
import './assets/style.scss';
import { HashRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


    <Provider store={store}>
        <HashRouter >
            <App />
            </HashRouter>
    </Provider>


);


import.meta.glob(['../images/**']);
import React from 'react';
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {store} from "./redux/store.js"


const rootElement = document.getElementById('root');
if(rootElement){
    ReactDOM.createRoot(rootElement).render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
}





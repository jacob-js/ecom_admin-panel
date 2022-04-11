import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { StyleReset } from 'atomize';
import { Provider } from 'react-redux';
import store from './Redux/store';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['bweteta_token'] = localStorage.getItem('authtoken');
const queryClient = new QueryClient();

ReactDOM.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <StyleReset />
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes />
        </Router>
      </QueryClientProvider>
    </Provider>
  </StyletronProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

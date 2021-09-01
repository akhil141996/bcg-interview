import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'
import 'bootstrap/dist/css/bootstrap.css';
import Analytics from './components/Analytics';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <Header />
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/analytics" component={Analytics}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

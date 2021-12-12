import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import InMemoryApp from './InMemoryApp';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './backend/store';
import { BrowserRouter } from 'react-router-dom'

import Loader from './components/Loader/Loader';
import App from './App';


const root = document.getElementById('root')

ReactDOM.render(<Loader />, root)

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store = {store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>,
    root
  )
});


// ReactDOM.render(
//   <React.StrictMode>
//     <InMemoryApp/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

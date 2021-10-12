import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InMemoryApp from './InMemoryApp';
import reportWebVitals from './reportWebVitals';


let initialData = [
  {
    id: 1,
    description: "Do laundry",
    completed: false,
  },
  {
    id: 2,
    description: "Call mom",
    completed: false,
  },

]


ReactDOM.render(
  <React.StrictMode>
    {/* <App initialData={initialData}/> */}
    <InMemoryApp initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

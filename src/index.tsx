import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
window.addEventListener("beforeunload", () => alert("I am closing"))
ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


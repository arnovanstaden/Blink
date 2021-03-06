import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

// Styles, Fonts, Icons
import "./styles/global.scss";
import "typeface-comfortaa";
import "typeface-poppins"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

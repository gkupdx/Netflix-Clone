import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index_550.css';
import './index_950.css';
import './login.css';
import './login_500.css';
// import './login_950.css';
import './registration.css';
import './registration_500.css';
import App from './App';

// React Router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

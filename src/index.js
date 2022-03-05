import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index_576.css';
import './login.css';
import './registration.css';
import './registration_576.css';
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

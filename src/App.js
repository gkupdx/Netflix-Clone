//// App.js

import Homepage from './components/Homepage';
import Loginpage from './components/Loginpage';

import { useState } from 'react';

// Routes from React Router
import { Routes, Route } from 'react-router-dom';

function App() {
  const [toggle, setToggle] = useState(false);

  // Toggle for languages button
  const toggleLanguages = () => {
    setToggle(!toggle)
  }

  return (
    <div className="container">
      <Routes>
        {/* HOMEPAGE / LANDING PAGE */}
        <Route path='/' element={
          <>
            <Homepage toggleLanguages={toggleLanguages} toggle={toggle}/>
          </>
          } 
        />

        {/* LOGIN PAGE */}
        <Route path='/login' element={
          <>
            <Loginpage toggleLanguages={toggleLanguages} toggle={toggle}/>
          </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

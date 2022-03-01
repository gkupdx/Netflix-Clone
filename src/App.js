//// App.js

import Homepage from './components/Homepage';
import Registration from './components/Registration';
import RegForm from './components/RegForm';
import SignUp from './components/SignUp';
import PlanForm from './components/PlanForm';
// import Payment from './components/Payment';

import Loginpage from './components/Loginpage';
import FooterAlt from './components/FooterAlt';

import { useState } from 'react';
import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';

import logoImgSrc from './assets/netflix_text_logo.png'

// Routes from React Router
import { Routes, Route } from 'react-router-dom';

function App() {
  const [toggle, setToggle] = useState(false);

  // Toggle for languages button
  const toggleLanguages = () => {
    setToggle(!toggle)
  }

  // different footer theme depending on page
  const footerTheme = "light";

  // Globe icon styling 
  const globeIconStyle = {
    color: "#000"
  }

  // Caret down icon styling 
  const caretIconStyle = {
    color: "#000"
  }

  return (
    <div className="container">
      <Routes>
        {/* HOMEPAGE / LANDING PAGE */}
        <Route path='/' element={
          <>
            <Homepage toggleLanguages={toggleLanguages} toggle={toggle} />
          </>
        }
        />

        {/* INITIAL REGISTRATION PAGE */}
        <Route path='/signup/registration' element={
          <>
            <Registration logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 1 of 3 REGISTRATION */}
        <Route path='/signup/regform' element={
          <>
            <RegForm logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 2 of 3 REGISTRATION */}
        <Route path='/signup' element={
          <>
            <SignUp logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 2 continued... */}
        <Route path='/signup/planform' element={
          <>
            <PlanForm logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 3 of 3 REGISTRATION */}
        {/* <Route path='/signup/payment' element={
          <>
            <Payment logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } /> */}

        {/* LOGIN PAGE */}
        <Route path='/login' element={
          <>
            <Loginpage toggleLanguages={toggleLanguages} toggle={toggle} />
          </>
        }
        />
      </Routes>
    </div>
  );
}

export default App;

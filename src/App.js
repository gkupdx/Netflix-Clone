//// App.js

import { useState } from 'react';

import Homepage from './components/Homepage';
import Registration from './components/Registration';
import RegForm from './components/RegForm';
import SignUp from './components/SignUp';
import PlanForm from './components/PlanForm';
import Payment from './components/Payment';
import CreditOption from './components/CreditOption';
import PaypalOption from './components/PaypalOption';
import GiftOption from './components/GiftOption';
import EditPlan from './components/EditPlan';
import Loginpage from './components/Loginpage';
import FooterAlt from './components/FooterAlt';

import { IoGlobe } from 'react-icons/io5';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { AiFillCaretDown } from 'react-icons/ai';
import { VscChevronRight } from 'react-icons/vsc';

import logoImgSrc from './assets/netflix_text_logo.png';

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

  // SVG styling
  const svgStyle = {
    width: "60px",
    height: "25px"
  }

  // Discover card PNG styling 
  const pngStyle = {
    width: "40px",
    height: "25px"
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
            <SignUp logo={logoImgSrc} checkMarkCircle={<IoIosCheckmarkCircleOutline style={{ color: "#e50914", fontSize: "3.5rem" }}/>} checkMark={<IoCheckmarkOutline style={{ color: "#e50914", fontSize: "2rem" }}/>}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 2 continued... */}
        <Route path='/signup/planform' element={
          <>
            <PlanForm logo={logoImgSrc} checkMarkLg={<IoCheckmarkOutline style={{ color: "#e50914", fontSize: "2rem" }}/>} checkMarkSm={<IoCheckmarkOutline style={{ fontSize: "2rem" }}/>}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 3 of 3 REGISTRATION */}
        <Route path='/signup/payment' element={
          <>
            <Payment logo={logoImgSrc} chevronRight={<VscChevronRight style={{ color: "lightgrey", fontSize: "2rem" }}/>} svgStyle={svgStyle} pngStyle={pngStyle}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 3 continued... Credit */}
        <Route path='/signup/creditoption' element={
          <>
            <CreditOption logo={logoImgSrc} svgStyle={svgStyle} pngStyle={pngStyle}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 3 continued... PayPal */}
        <Route path='/signup/paypaloption' element={
          <>
            <PaypalOption logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        } />

        {/* STEP 3 continued... Gift code */}
        <Route path='/signup/giftoption' element={
          <>
            <GiftOption logo={logoImgSrc} />
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        }/>

        {/* EDIT PLAN */}
        <Route path='/signup/editplan' element={
          <>
            <EditPlan logo={logoImgSrc} checkMarkLg={<IoCheckmarkOutline style={{ color: "#e50914", fontSize: "2rem" }}/>} checkMarkSm={<IoCheckmarkOutline style={{ fontSize: "2rem" }}/>}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle} />} caretIcon={<AiFillCaretDown style={caretIconStyle} />} theme={footerTheme} />
          </>
        }/>

        {/* LOGIN PAGE */}
        <Route path='/login' element={
          <>
            <Loginpage />
          </>
        }
        />
      </Routes>
    </div>
  );
}

export default App;

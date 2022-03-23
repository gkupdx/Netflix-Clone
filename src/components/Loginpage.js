//// Loginpage.js - container component to house all components relevant to the 'Sign In' page
//// shared code logic will be stored here

import { IoGlobe } from 'react-icons/io5';
import { VscChevronDown } from 'react-icons/vsc';
import { ImFacebook2 } from 'react-icons/im';

import Login from './Login';
import FooterAlt from './FooterAlt';

const Loginpage = ({ toggleLanguages, toggle }) => {
    // different footer theme depending on page
    let footerTheme = "dark";

    return (
        <div>
            <Login fbIcon={<ImFacebook2 style={{ width: "20px", height: "20px", background: "#FFF", color: "#4267b2" }}/>}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={{ color: "grey" }}/>} chevronDownIcon={<VscChevronDown />} theme={footerTheme}/>
        </div>
    )
}

export default Loginpage;
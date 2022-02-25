//// Loginpage.js - container component to house all components relevant to the 'Sign In' page
//// shared code logic will be stored here

import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';
import { ImFacebook2 } from 'react-icons/im';

import Login from './Login';
import FooterAlt from './FooterAlt';

const Loginpage = ({ toggleLanguages, toggle }) => {
    // Facebook icon styling
    const fbIconStyle = {
        width: "20px",
        height: "20px",
        background: "#FFF",
        color: "#4267b2"
    }

    // Globe icon styling
    const globeIconStyle = {
        color: "grey"
    }

    return (
        <div>
            <Login fbIcon={<ImFacebook2 style={fbIconStyle}/>}/>
            <FooterAlt toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle}/>} caretIcon={<AiFillCaretDown />}/>
        </div>
    )
}

export default Loginpage;
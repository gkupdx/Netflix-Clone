//// SignUppage.js - container component to house all components relevant to the 'Sign Up' process

import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';

import Registration from './Registration';
import FooterAlt from './FooterAlt';

import logoImgSrc from '../assets/netflix_text_logo.png'


const SignUppage = ({ toggleLanguages, toggle }) => {
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
        <div>
            <Registration logo={logoImgSrc}/>
            <FooterAlt globeIcon={<IoGlobe style={globeIconStyle}/>} caretIcon={<AiFillCaretDown style={caretIconStyle}/>} theme={footerTheme}/>
        </div>
    )
}

export default SignUppage;
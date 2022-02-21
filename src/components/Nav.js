//// Nav.js - component for navbar

import { useState } from 'react';

import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';
import logo from '../static/netflix_text_logo.png';

const Nav = () => {
    const [show, setShow] = useState(false);

    // Globe icon styling
    const globeIconStyle = {
        color: "#FFF"
    }

    // Toggle for languages button
    const showLanguages = () => {
        setShow(!show);
    }

    return (
        <nav className='nav'>
            <a href='/'><img src={logo} alt="Netflix text logo" /></a>

            <ul>
                <li>
                    <button className='languageBtn' onClick={showLanguages}><IoGlobe style={globeIconStyle}/> English <AiFillCaretDown /></button>
                    {show ? <div className='languageDropDown'><p>English</p><p>Espanol</p></div> : ''}
                    <a href='/login' className='signIn'>Sign In</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
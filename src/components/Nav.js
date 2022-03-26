//// Nav.js - component for navbar

import { useEffect } from 'react';
import _ from 'lodash';

import logo from '../assets/netflix_text_logo.png';
import { useNavigate } from 'react-router';

const Nav = ({ toggleLanguages, toggle, setToggle, globeIcon, caretIcon }) => {
    let navigate = useNavigate();
    let scrollEvent = false; // variable to detect scroll event

    const hideLangOnScroll = () => {
        let upScrollPos = window.scrollY - 1;
        let scrollPos = window.scrollY;
        let downScrollPos = window.scrollY + 1;

        // detect scroll movement (up or down, does not matter)
        if (scrollPos > upScrollPos || scrollPos < downScrollPos) {
            scrollEvent = true;
        }

        // reset "toggle" to ensure its state value is default for next button click
        // doing so prevents inconsistent states for ternary operation on Line 57
        setToggle(false);
    }

    useEffect(() => {
        // only use this effect if toggle === true
        if (toggle === true) {
            const throttledScroll = _.throttle(hideLangOnScroll, 100);
            window.addEventListener('scroll', throttledScroll);

            return () => {
                window.removeEventListener('scroll', throttledScroll);
            };
        }
    });


    return (
        <nav className='nav'>
            <img src={logo} alt="Netflix text logo" />

            <div>
                <button className='languageBtn' onClick={() => toggleLanguages(!toggle)} onBlur={() => setToggle(false)}>{globeIcon} English {caretIcon}</button>
                {toggle && !scrollEvent ? <div className='languageDropDown'><p>English</p><p>Espanol</p></div> : ''}
                <button className='signIn' onClick={() => navigate('/login')}>Sign In</button>
            </div>
        </nav>
    )
}

export default Nav;
//// Nav.js - component for navbar

import { useEffect } from 'react';
import _ from 'lodash';

import logo from '../assets/netflix_text_logo.png';

const Nav = ({ toggleLanguages, toggle, globeIcon, caretIcon }) => {
    let scrollEvent = false; // variable to detect scroll event

    // toggle for language btn
    const showLanguages = () => {
        toggleLanguages(!toggle)
    }

    // hide languages
    const hideLanguages = () => {
        toggleLanguages(false)
    }

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
        toggleLanguages(false);
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

            <ul>
                <li>
                    <button className='languageBtn' onClick={showLanguages} onBlur={hideLanguages}>{globeIcon} English {caretIcon}</button>
                    {toggle && !scrollEvent ? <div className='languageDropDown'><p>English</p><p>Espanol</p></div> : ''}
                    <a href='/login' className='signIn'>Sign In</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
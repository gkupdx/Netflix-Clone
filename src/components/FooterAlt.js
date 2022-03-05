//// FooterAlt.js - component for alternate footer placed at bottom of Sign In page

import { useEffect } from 'react';
import _ from 'lodash';

import { AiFillCaretDown } from 'react-icons/ai';

const FooterAlt = ({ toggleLanguages, toggle, globeIcon, chevronDownIcon, theme }) => {
    let scrollEvent = false; // variable to detect scroll event

    // toggle for language btn
    const showLanguages = () => {
        toggleLanguages(!toggle)
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
    };

    useEffect(() => {
        // only use this effect IF toggle === true
        if (toggle === true) {
            const throttledScroll = _.throttle(hideLangOnScroll, 100); // hard limit function call to 1 every 500ms
            window.addEventListener('scroll', throttledScroll);

            return () => {
                window.removeEventListener('scroll', throttledScroll);
            };
        }
    });

    return (
        <footer className={theme === 'dark' ? 'footerAlt' : 'footerAltLight'}>
            <div className='footerWrapperAlt'>
                <p>Questions? Call <a href='tel:1-844-505-2993'>1-844-505-2993</a></p>


                <div className={theme === 'dark' ? 'linksWrapper' : 'linksWrapperAltLight'}>
                    <a href='#faq'>FAQ</a>
                    <a href='#help'>Help Center</a>
                    <a href='#tos'>Terms of Use</a>
                    <a href='#privacy'>Privacy</a>
                    <a href='#cookies'>Cookie Preferences</a>
                    <a href='#ci'>Corporate Information</a>
                </div>

                <div>
                    {toggle && !scrollEvent ? <div className={theme === 'dark' ? 'languagePopUp' : 'languagePopUpLight'}><p>English</p><p>Espanol</p></div> : ''}
                    <button onClick={showLanguages}>{globeIcon} English {theme === 'dark' ? chevronDownIcon : <AiFillCaretDown />}</button>
                </div>
            </div>
        </footer>
    )
}

export default FooterAlt;
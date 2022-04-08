//// FooterAlt.js - component for alternate footer placed at bottom of Sign In page

import { useState, useEffect } from 'react';
import _ from 'lodash';

import { AiFillCaretDown } from 'react-icons/ai';

const FooterAlt = ({ globeIcon, chevronDownIcon, theme }) => {
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const [toggle, setToggle] = useState(false);
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
    };

    // Detect scroll activity (throttled to once every 100ms)
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

    // Remove border-top from footer on browser width >= 745px
    useEffect(() => {
        const updateWidth = () => {
            let updateWidth = 0;

            if (window.innerWidth < 745) {
                updateWidth = 744;
            } else {
                updateWidth = 745;
            }

            setBrowserWidth(updateWidth);
        }

        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    });

    return (
        <footer className={theme === 'dark' ? 'footerAlt' : 'footerAltLight'} style={{ borderTop: (browserWidth >= 745 && theme === 'dark') ? 'none' : null }}>
            <div className='footerWrapperAlt'>
                <p>Questions? Call <a href='tel:1-844-505-2993'>1-844-505-2993</a></p>


                <div className={theme === 'dark' ? 'linksWrapperAlt' : 'linksWrapperAltLight'}>
                    <a href='#faq'>FAQ</a>
                    <a href='#help'>Help Center</a>
                    <a href='#tos'>Terms of Use</a>
                    <a href='#privacy'>Privacy</a>
                    <a href='#cookies'>Cookie Preferences</a>
                    <a href='#ci'>Corporate Information</a>
                </div>

                <div className='languageBtnContainer'>
                    <button className={theme === 'dark' ? 'languageBtnAlt' : 'languageBtnLight'} onClick={() => toggle ? setToggle(false) : setToggle(true)} onBlur={() => setToggle(false)}>{globeIcon} English {theme === 'dark' ? chevronDownIcon : <AiFillCaretDown />}</button>
                    {toggle && !scrollEvent ? <div className={theme === 'dark' ? 'languagePopUp' : 'languagePopUpLight'}><p>English</p><p>Espanol</p></div> : ''}
                </div>
            </div>
        </footer>
    )
}

export default FooterAlt;
//// Footer.js - component for the footer

import { useState, useEffect } from 'react';
import _ from 'lodash';

const Footer = ({ globeIcon, caretIcon }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);

    // Toggle for languages button
    const showLanguages = () => {
        setShow(!show);
    }

    // hide languages
    const hideLanguages = () => {
        setShow(false);
    }

    // Throttle = hard limits the FREQUENCY of how many times a function is called within a time span
    // Debounce = ensures function ONLY RUNS ONCE after given delay BUT ONLY IF ITS NOT CALLED AGAIN WITHIN THAT TIME SPAN
    // (i.e. subsequent calls will each RESET the time for debounce)

    let scrollEvent = false; // variable to detect scroll event

    // Toggle off the languages <div> on first scroll detection
    const hideLangOnScroll = () => {
        let upScrollPos = window.scrollY - 1;
        let scrollPos = window.scrollY;
        let downScrollPos = window.scrollY + 1;

        // detect scroll movement (up or down, does not matter)
        if (scrollPos > upScrollPos || scrollPos < downScrollPos) {
            scrollEvent = true;
        }

        // reset "show" to ensure its state value is default for next button click
        // doing so prevents inconsistent states for ternary operation on Line 86
        setShow(false);
    };

    useEffect(() => {
        // only use this effect IF show === true
        if (show === true) {
            const throttledScroll = _.throttle(hideLangOnScroll, 100); // hard limit function call to 1 every 500ms
            window.addEventListener('scroll', throttledScroll);

            return () => {
                window.removeEventListener('scroll', throttledScroll);
            };
        }
    });

    // Conditional rendering for the 'Corporate Information' link
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    });


    return (
        <footer>
            <div className='footerWrapper'>
                <p>Questions? Call <a href='tel:1-844-505-2993'>1-844-505-2993</a></p>


                <div className='linksWrapper'>
                    <a href='#faq'>FAQ</a>
                    <a href='#help'>Help Center</a>
                    <a href='#account'>Account</a>
                    <a href='#media'>Media Center</a>
                    <a href='#ir'>Investor Relations</a>
                    <a href='#jobs'>Jobs</a>
                    <a href='#redeem'>Redeem Gift Cards</a>
                    <a href='#giftcards'>Buy Gift Cards</a>
                    <a href='#ww'>Ways to Watch</a>
                    <a href='#tos'>Terms of Use</a>
                    <a href='#privacy'>Privacy</a>
                    <a href='#cookies'>Cookie Preferences</a>
                    {width < 550 || width >= 590 ? <a href='#ci'>Corporate Information</a> : <a href='#ci'>Corporate<br/>Information</a>}
                    <a href='#contact'>Contact Us</a>
                    <a href='#speedtest'>Speed Test</a>
                    <a href='#legal'>Legal Notices</a>
                    <a href='#exclusives'>Only on Netflix</a>
                </div>

                <div>
                    {show && !scrollEvent ? <div className='languagePopUpAlt'><p>English</p><p>Espanol</p></div> : ''}
                    <button onClick={showLanguages} onBlur={hideLanguages}>{globeIcon} English {caretIcon}</button>
                </div>
            </div>

        </footer>
    )
}

export default Footer;
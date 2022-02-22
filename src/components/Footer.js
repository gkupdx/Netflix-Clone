//// Footer.js - component for the footer

import { useState } from 'react';

import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';

const Footer = () => {
    const [show, setShow] = useState(false);

    const globeIconStyle = {
        color: "grey"
    }

    // Toggle for languages button
    const showLanguages = () => {
        setShow(!show);
    }

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
                    <a href='#ci'>Corporate Information</a>
                    <a href='#contact'>Contact Us</a>
                    <a href='#speedtest'>Speed Test</a>
                    <a href='#legal'>Legal Notices</a>
                    <a href='#exclusives'>Only on Netflix</a>
                </div>

                <div>
                    {/* {show ? <div className='languagePopUp'><p>English</p><p>Espanol</p></div> : ''} */}
                    <button onClick={showLanguages}><IoGlobe style={globeIconStyle} /> English <AiFillCaretDown /></button>
                </div>
            </div>

        </footer>
    )
}

export default Footer;
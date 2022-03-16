//// Banner.js - component for Netflix hero image banner

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { VscChevronRight } from 'react-icons/vsc';

const Banner = () => {
    const [emailVal, setEmailVal] = useState('');
    const emailRef = useRef();

    let reroute = useNavigate();

    // On click, send the user to the Sign Up/Registration page (AFTER validation)
    const redirect = () => {
        let fieldVal = emailRef.current.value;

        if (fieldVal.length === 0) {
            emailRef.current.focus();
            fieldVal = 'empty'
        } else {
            fieldVal = 'nonEmpty'
        }

        setEmailVal(fieldVal);
    }

    // trigger this effect after email validation + 'emailVal' state change
    // dependencies --> emailVal, reroute()
    useEffect(() => {
        if (emailVal === 'nonEmpty') {
            let path = `/signup/registration`;
            reroute(path);
        }
    }, [emailVal, reroute])

    return (
        <div className='main'>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership</p>

            {window.innerWidth < 950 ?
                <div className='mainFlexRow'>
                    <input ref={emailRef} type="text" name="email" placeholder="Email address" style={{ borderBottom: emailVal === 'empty' ? '2px solid orange' : 'none' }} />
                    {emailVal === 'empty' && <p style={{ color: 'orange' }}>Email is required!</p>}

                    <button onClick={redirect}>Get Started <VscChevronRight /></button>
                </div>
                :
                <>
                    <div className='mainFlexRowAlt'>
                        <input ref={emailRef} type="text" name="email" placeholder="Email address" style={{ borderBottom: emailVal === 'empty' ? '2px solid orange' : 'none' }} />
                        {emailVal === 'empty' && <p style={{ color: 'orange' }}>Email is required!</p>}

                        <button onClick={redirect}>Get Started <VscChevronRight /></button>
                    </div>
                </>
            }
        </div>
    )
}

export default Banner;
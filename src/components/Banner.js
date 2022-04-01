//// Banner.js - component for Netflix hero image banner

import { useState, useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router';

const Banner = ({ chevronIcon }) => {
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    let navigate = useNavigate();
    const emailRef = useRef();

    const initialState = {
        emailVal: ''
    }

    const reducer = (state, action) => {
        switch (action.type) {
            // 'Empty' = show initial error message + give input field orange border bottom
            case 'Empty':
                return { emailVal: 'empty' }
            case 'Invalid':
                return { emailVal: 'invalid' }
            case 'Valid':
                return { emailVal: 'valid' }
            // 'Valid Click' = email passed validation AND 'Get Started' button was clicked
            case 'Valid Click':
                return { emailVal: 'valid click' }
            default:
                return state;
        }
    }

    const [emailState, dispatch] = useReducer(reducer, initialState);

    // On Button click, sends user to the Sign Up/Registration page if validation passed
    const goToRegistration = () => {
        let fieldVal = emailRef.current.value;
        let len = fieldVal.length;

        // if either 0 or 1 character, ON BUTTON CLICK, need to apply FOCUS
        if (len === 0 || len === 1) {
            emailRef.current.focus();
            dispatch({
                type: 'Empty'
            });
        } else if (len > 1 && len < 5) { // 2-4 characters, DON'T FOCUS
            dispatch({
                type: 'Empty'
            });
        } else if (len >= 5) { // VALIDATE
            let flag = false; // flag is set on meeting validation requirements

            // loop through input
            for (let i = 0; i < len; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // a '.' is RIGHT AFTER the '@' index (invalid so break loop)
                    if (fieldVal.charAt(atSignIndex + 1) === '.') {
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex + 1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, len);
                            if (dotComString.includes('.com')) {
                                flag = true;
                                break;
                            }
                        }

                    }
                }
            }


            if (flag === false) {
                dispatch({
                    type: 'Invalid'
                });
            } else { // else, given email is valid
                dispatch({
                    type: 'Valid Click'
                });
            }
        }
    }

    // trigger this effect ONLY AFTER email validation + correct state + button click
    // dependencies --> emailState.emailVal, navigate()
    useEffect(() => {
        if (emailState.emailVal === 'valid click') {
            let path = `/signup/registration`;

            navigate(path, {
                state: {
                    email: emailRef.current.value
                }
            });
        }
    }, [emailState.emailVal, navigate]);


    // OnBlur handler
    const handleOnBlur = (event) => {
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        // if less than 5 characters, displays 'Email is required!'
        if (len < 5) {
            dispatch({
                type: 'Empty'
            });
        } else if (len >= 5) {
            let flag = false; // flag is set on meeting validation requirements

            // loop through input
            for (let i = 0; i < len; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // '.' character is RIGHT AFTER the '@' index (i.e. invalid so break loop)
                    if (fieldVal.charAt(atSignIndex + 1) === '.') {
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex + 1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, len);
                            if (dotComString.includes('.com')) {
                                flag = true;
                                break;
                            }
                        }

                    }
                }
            }


            if (flag === false) {
                dispatch({
                    type: 'Invalid'
                });
            } else { // else, given email is valid
                dispatch({
                    type: 'Valid'
                });
            }
        }
    }

    // OnChange handler (only triggers if state is NOT in default state)
    const handleOnChange = (event) => {
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (len < 5 && emailState.emailVal !== '') {
            dispatch({
                type: 'Empty'
            });
        } else if (len >= 5 && emailState.emailVal !== '') { // VALIDATE
            let flag = false;

            // loop through input
            for (let i = 0; i < len; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // '.' character is RIGHT AFTER the '@' index (i.e. invalid so break loop)
                    if (fieldVal.charAt(atSignIndex + 1) === '.') {
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex + 1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, len);
                            if (dotComString.includes('.com')) {
                                flag = true;
                                break;
                            }
                        }

                    }
                }
            }

            if (flag === false) {
                dispatch({
                    type: 'Invalid'
                });
            } else { // else, given email is valid
                dispatch({
                    type: 'Valid'
                });
            }
        }
    }

    // Apply conditional inline border styling based on state value
    let inputBorderStyle = {};
    if (emailState.emailVal === 'empty' || emailState.emailVal === 'invalid') {
        inputBorderStyle = {
            border: 'none',
            borderBottom: '2px solid orange'
        }
    } else if (emailState.emailVal === 'valid') {
        inputBorderStyle = {
            borderBottom: 'none',
            border: '1px solid green'
        }
    } else {
        inputBorderStyle = {}
    }

    // At browser width >= 600px, override 'banner' width using inline styling AND
    // at browser width >= 950px, render 'mainFlexRowAlt' instead of 'mainFlexRow'
    useEffect(() => {
        const overrideWidth = () => {
            let updateWidth = 0;

            if (window.innerWidth < 600) {
                updateWidth = 599;
            } else if (window.innerWidth >= 600 && window.innerWidth < 950) {
                updateWidth = 600;
            } else {
                updateWidth = 950;
            }

            setBrowserWidth(updateWidth);
        }

        window.addEventListener('resize', overrideWidth);

        return () => {
            window.removeEventListener('resize', overrideWidth);
        }
    });


    return (
        <div className='banner' style={{ marginBottom: (emailState.emailVal === 'empty' || emailState.emailVal === 'invalid') && '30px' }}>
            <div className='bannerWrapper' style={{ width: browserWidth >= 600 && "600px" }}>
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership</p>

                {browserWidth < 950 ?
                    <div className='bannerFlexRow'>
                        <div>
                            <input ref={emailRef} type="text" name="email" placeholder="Email address" style={inputBorderStyle} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                            {emailState.emailVal === 'empty' && <p>Email is required!</p>}
                            {emailState.emailVal === 'invalid' && <p>Please enter a valid email address</p>}
                        </div>

                        <button onClick={goToRegistration}>Get Started {chevronIcon}</button>
                    </div>
                    :
                    <>
                        <div className='bannerFlexRowAlt'>
                            <div>
                                <input ref={emailRef} type="text" name="email" placeholder="Email address" style={inputBorderStyle} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                                <p style={{ opacity: emailState.emailVal === 'empty' && '1' }}>Email is required!</p>
                                <p style={{ opacity: emailState.emailVal === 'invalid' && '1' }}>Please enter a valid email address</p>
                            </div>

                            <button onClick={goToRegistration}>Get Started {chevronIcon}</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Banner;
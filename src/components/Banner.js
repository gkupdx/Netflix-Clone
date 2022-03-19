//// Banner.js - component for Netflix hero image banner

import { useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router';

import { VscChevronRight } from 'react-icons/vsc';

const Banner = () => {
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
                return { emailVal : 'valid click' }
            default: 
                return state;
        }
    }

    const [emailState, dispatch] = useReducer(reducer, initialState);

    
    let reroute = useNavigate();

    // On Button click, sends user to the Sign Up/Registration page if validation passed
    const redirect = () => {
        let fieldVal = emailRef.current.value;

        // if either 0 or 1 character, ON BUTTON CLICK, need to apply FOCUS
        if (fieldVal.length === 0 || fieldVal.length === 1) {
            emailRef.current.focus();
            dispatch({
                type: 'Empty'
            });
        } else if (fieldVal.length > 1 && fieldVal.length < 5) { // 2-4 characters, DON'T FOCUS
            dispatch({
                type: 'Empty'
            });
        } else if (fieldVal.length >= 5) { // VALIDATE
            let flag = false; // flag is set on meeting validation requirements

            // loop through input
            for (let i = 0; i < fieldVal.length; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // a '.' is RIGHT AFTER the '@' index (invalid so break loop)
                    if (fieldVal.charAt(atSignIndex+1) === '.') { 
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex+1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, fieldVal.length);
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
    // dependencies --> emailState.emailVal, reroute()
    useEffect(() => {
        if (emailState.emailVal === 'valid click') {
            let path = `/signup/registration`;

            reroute(path, {
                state: {
                    email: emailRef.current.value
                }
            });
        }
    }, [emailState.emailVal, reroute]);


    // OnBlur handler
    const handleOnBlur = (event) => {
        let fieldVal = event.target.value;

        // if less than 5 characters, displays 'Email is required!'
        if (fieldVal.length < 5) {
            dispatch({
                type: 'Empty'
            });
        } else if (fieldVal.length >= 5) {
            let flag = false; // flag is set on meeting validation requirements

            // loop through input
            for (let i = 0; i < fieldVal.length; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // '.' character is RIGHT AFTER the '@' index (i.e. invalid so break loop)
                    if (fieldVal.charAt(atSignIndex+1) === '.') { 
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex+1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, fieldVal.length);
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

        if (fieldVal.length < 5 && emailState.emailVal !== '') {
            dispatch({
                type: 'Empty'
            });
        } else if (fieldVal.length >= 5 && emailState.emailVal !== '') { // VALIDATE
            let flag = false;

            // loop through input
            for (let i = 0; i < fieldVal.length; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // '.' character is RIGHT AFTER the '@' index (i.e. invalid so break loop)
                    if (fieldVal.charAt(atSignIndex+1) === '.') { 
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex+1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, fieldVal.length);
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

    return (
        <div className='main'>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership</p>

            {window.innerWidth < 950 ?
                <div className='mainFlexRow'>
                    <input ref={emailRef} type="text" name="email" placeholder="Email address" style={{ borderBottom: (emailState.emailVal === 'empty' || emailState.emailVal === 'invalid') && '2px solid orange', borderColor: emailState.emailVal === 'valid' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {emailState.emailVal === 'empty' && <p style={{ color: 'orange', fontSize: '0.9rem' }}>Email is required!</p>}
                    {emailState.emailVal === 'invalid' && <p style={{ color: 'orange', fontSize: '0.9rem' }}>Please enter a valid email address</p>}

                    <button onClick={redirect}>Get Started <VscChevronRight /></button>
                </div>
                :
                <>
                    <div className='mainFlexRowAlt'>
                        <input ref={emailRef} type="text" name="email" placeholder="Email address" style={{ borderBottom: (emailState.emailVal === 'empty' || emailState.emailVal === 'invalid') && '2px solid orange', borderColor: emailState.emailVal === 'valid' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                        {emailState.emailVal === 'empty' && <p style={{ color: 'orange', fontSize: '0.9rem' }}>Email is required!</p>}
                        {emailState.emailVal === 'invalid' && <p style={{ color: 'orange', fontSize: '0.9rem' }}>Please enter a valid email address</p>}

                        <button onClick={redirect}>Get Started <VscChevronRight /></button>
                    </div>
                </>
            }
        </div>
    )
}

export default Banner;
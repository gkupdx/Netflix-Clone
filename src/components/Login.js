//// Login.js - component for the login page

import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router';

import textLogo from '../assets/netflix_text_logo.png';

const Login = ({ fbIcon }) => {
    const [show, setShow] = useState(false);
    let navigate = useNavigate();

    const initialState = {
        userName: '',
        password: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            // 'Orange Border' = display error message below input field + show orange border bottom
            case 'Orange Border':
                return {
                    ...state,
                    [action.payload]: 'orange'
                }
            // 'Remove Border' = remove orange border on valid input
            case 'Remove Border':
                return {
                    ...state,
                    [action.payload]: 'remove border'
                }
            // 'Validate Email' = when 1st character is NON-DIGIT, validate the email
            case 'Validate Email':
                return {
                    ...state,
                    [action.payload]: 'validate email'
                }
            // 'Validate Phone' = when 1st character is DIGIT, validate the phone number
            case 'Validate Phone':
                return {
                    ...state,
                    [action.payload]: 'validate phone'
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // onBlur handler
    const handleOnBlur = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        // apply for both fields
        if (len === 0) {
            dispatch({
                type: 'Orange Border',
                payload: fieldName
            });
        }
        else if (fieldName === 'userName') {
            if (len >= 5 && len < 51) { // on valid input, remove orange border
                dispatch({
                    type: 'Remove Border',
                    payload: fieldName
                });
            } else if (isNaN(fieldVal.charAt(0)) && (len < 5 || len >= 51)) { // ask for valid email
                dispatch({
                    type: 'Validate Email',
                    payload: fieldName
                });
            } else if (!isNaN(fieldVal.charAt(0)) && (len < 5 || len >= 51)) { // ask for valid phone number
                dispatch({
                    type: 'Validate Phone',
                    payload: fieldName
                });
            }
        }
        else if (fieldName === 'password') {
            if (len < 4 || len > 60) {
                dispatch({
                    type: 'Orange Border',
                    payload: fieldName
                });
            } else {
                dispatch({
                    type: 'Remove Border',
                    payload: fieldName
                });
            }
        }
    }

    // onChange handler (dispatch ONLY if onBlur event has not already happened)
    const handleOnChange = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (len === 0) {
            dispatch({
                type: 'Orange Border',
                payload: fieldName
            });
        } else if (fieldName === 'userName' && state.userName !== '') {
            // if first character is NON-DIGIT & length < 5 or >= 51 - ask for EMAIL
            if (isNaN(fieldVal.charAt(0)) && (len < 5 || len >= 51)) {
                dispatch({
                    type: 'Validate Email',
                    payload: fieldName
                });
            }
            // if first character is DIGIT & length < 5 or >= 51 - ask for PHONE NUM
            else if (!isNaN(fieldVal.charAt(0)) && (len < 5 || len >= 51)) {
                dispatch({
                    type: 'Validate Phone',
                    payload: fieldName
                });
            } 
            else if (len >= 5 && len < 51) {
                dispatch({
                    type: 'Remove Border',
                    payload: fieldName
                });
            }
        } else if (fieldName === 'password' && state.password !== '') {
            if (len < 4 || len > 60) {
                dispatch({
                    type: 'Orange Border',
                    payload: fieldName
                });
            } else {
                dispatch({
                    type: 'Remove Border',
                    payload: fieldName
                });
            }
        }
    }

    const errorMsgStyle = {
        color: '#F77819',
        fontSize: '0.8rem'
    }


    return (
        <div className='login'>
            <button className='redirectBtn' onClick={() => navigate('/')}><img src={textLogo} alt='Netflix text logo' /></button>

            <div className='formDiv'>
                <h1>Sign In</h1>
                <form action="POST">
                    <div className='form'>
                        <input type="text" name="userName" placeholder="Email or phone number" style={{ borderBottom: (state.userName !== '' && state.userName !== 'remove border') ? '2px solid #F77819' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                        {state.userName === 'orange' && <p style={errorMsgStyle}>Please enter a valid email or phone number.</p>}
                        {state.userName === 'validate email' && <p style={errorMsgStyle}>Please enter a valid email.</p>}
                        {state.userName === 'validate phone' && <p style={errorMsgStyle}>Please enter a valid phone number.</p>}

                        <input type="text" name="password" placeholder="Password" style={{ borderBottom: (state.password !== '' && state.password !== 'remove border') ? '2px solid #F77819' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                        {state.password === 'orange' && <p style={errorMsgStyle}>Your password must contain between 4 and 60 characters.</p>}

                        <input type="button" value="Sign In"/>
                        <div className='rowJustifyBetween'>
                            <div>
                                <input type="checkbox" id="checkbox" />
                                <label htmlFor="checkbox"> Remember me</label>
                            </div>

                            <button className='helpBtn'>Need help?</button>
                        </div>
                    </div>

                    <div className='formHelp'>
                        <button className='fbBtn'>{fbIcon} Login with Facebook</button>
                        <p className='signUp'>New to Netflix? <a href='/'>Sign up now</a>.</p>
                        <p className='captcha'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={!show ? 'learnMore' : 'hidden'} onClick={() => setShow(true)}>Learn more.</span></p>
                        {show && <p className='learnMoreDetails'>The information collected by Google reCAPTCHA is subject to the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a>, and is used for providing, maintaining, and improving the reCAPTCHA service
                            and for general security purposes (it is not used for personalized advertising by Google).
                        </p>}
                    </div>
                </form>
            </div>

            {window.innerWidth >= 950 && <div className='formBackground'></div>}
        </div>
    )
}

export default Login;


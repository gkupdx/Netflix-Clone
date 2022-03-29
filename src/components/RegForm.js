//// RegForm.js - component for the /signup/regform page (Step 1)

import { useEffect, useRef, useReducer } from 'react';
import { useNavigate, useLocation } from "react-router";

const RegForm = ({ logo }) => {
    let navigate = useNavigate();
    let emailRef = useRef();
    let passwordRef = useRef();
    let { state } = useLocation(); // destructure for direct use

    const initialState = {
        emailField: '',
        passwordField: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            // 'Red Box' = show initial error message + give input field red border
            case 'Red Box':
                return {
                    ...state,
                    [action.payload]: 'red'
                }
            // 'Green Box' = give input field green border
            case 'Green Box':
                return {
                    ...state,
                    [action.payload]: 'green'
                }
            // 'Validate Red' = ask for valid email
            case 'Validate Red':
                return {
                    ...state,
                    [action.payload]: 'validate red'
                }
            // 'Too Short' = on input of length < 6 characters, show warning
            case 'Too Short':
                return {
                    ...state,
                    [action.payload]: 'too short'
                }
            // 'Too Long' = on input of length > 60 characters, show warning
            case 'Too Long':
                return {
                    ...state,
                    [action.payload]: 'too long'
                }
            // 'Empty Fields' = on button click, both email & password fields were empty
            case 'Empty Fields':
                return {
                    emailField: 'red',
                    passwordField: 'red'
                }
            // 'Valid Click' = password passed validation AND 'Next' button clicked
            case 'Valid Click':
                return {
                    passwordField: 'valid click'
                }
            default:
                return state;
        }
    }

    const [inputState, dispatch] = useReducer(reducer, initialState);

    // function to verify email field on 'Next' button click
    const verifyEmail = () => {
        let fieldName = emailRef.current.name;
        let fieldVal = emailRef.current.value;
        let len = fieldVal.length;

        if (len === 0) {
            emailRef.current.focus();
            dispatch({
                type: 'Red Box',
                payload: fieldName
            });
        }
        else if (len > 0 && len < 5) { // see if email field length is under 5 chars
            emailRef.current.focus();
            dispatch({
                type: 'Too Short',
                payload: fieldName
            });
        }
        else if (len >= 5) {
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
                    emailRef.current.focus();
                    dispatch({
                        type: 'Validate Red',
                        payload: fieldName
                    });
                } else { // else, given email is valid
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });

                    // email passes, but password needs to be verified next
                    verifyPassword();
                }
        }
    }

    // function to verify password field on 'Next' button click
    const verifyPassword = () => {
        let fieldName = passwordRef.current.name;
        let fieldVal = passwordRef.current.value;
        let len = fieldVal.length;

        if (len === 0) { 
            passwordRef.current.focus();
            dispatch({
                type: 'Red Box',
                payload: fieldName
            });
        }
        else if (len > 0 && len < 6) {
            passwordRef.current.focus();
            dispatch({
                type: 'Too Short',
                payload: fieldName
            });
        }
        else if (len > 60) {
            passwordRef.current.focus();
            dispatch({
                type: 'Too Long',
                payload: fieldName
            });
        } else {
            dispatch({
                type: 'Valid Click'
            });
        }
    }

    // on button click, move to Step 2 of registration AFTER validating fields
    const goToSignUp = () => {
        let emailVal = emailRef.current.value;
        let emailLen = emailVal.length;
        let passwordVal = passwordRef.current.value;
        let len = passwordVal.length; 

        // check to see if BOTH fields are empty
        if (emailLen === 0 && len === 0) {
            dispatch({
                type: 'Empty Fields'
            });
        } else { // if at least ONE field is not empty, first verify email field
            verifyEmail();
        }
    }

    // trigger this effect ONLY AFTER password validation + correct state + button click
    // dependencies --> inputState.passwordField, navigate()
    useEffect(() => {
        if (inputState.passwordField === 'valid click') {
            let path = `/signup`;
            navigate(path)
        }
    }, [inputState.passwordField, navigate]);


    // onBlur handler
    const handleOnBlur = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (fieldName === 'passwordField') {
            if (len === 0) {    // password validation
                dispatch({
                    type: 'Red Box',
                    payload: fieldName
                });
            } else if (len > 0 && len < 6) {
                dispatch({
                    type: 'Too Short',
                    payload: fieldName
                });
            } else if (len > 60) {
                dispatch({
                    type: 'Too Long',
                    payload: fieldName
                });
            } else if (len >= 6 && len < 60) {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            }
        } else { // email validation
            if (len === 0) {
                dispatch({
                    type: 'Red Box',
                    payload: fieldName
                });
            } else if (len > 0 && len < 5) {
                dispatch({
                    type: 'Too Short',
                    payload: fieldName
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
                        type: 'Validate Red',
                        payload: fieldName
                    });
                } else { // else, given email is valid
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                }
            }
        }
    }

    // onChange handler (dispatch ONLY IF onBlur event HAS NOT already happened)
    const handleOnChange = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (fieldName === 'passwordField') { // password validation
            if (len === 0 && inputState.passwordField !== '') {
                dispatch({
                    type: 'Red Box',
                    payload: fieldName
                });
            } else if (len > 0 && len < 6 && inputState.passwordField !== '') {
                dispatch({
                    type: 'Too Short',
                    payload: fieldName
                });
            } else if (len > 60 && inputState.passwordField !== '') {
                dispatch({
                    type: 'Too Long',
                    payload: fieldName
                });
            } else if (len >= 6 && len < 60 && inputState.passwordField !== '') {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            }
        } else { // email validation
            if (len === 0 && inputState.emailField !== '') {
                dispatch({
                    type: 'Red Box',
                    payload: fieldName
                });
            } else if (len > 0 && len < 5 && inputState.emailField !== '') {
                dispatch({
                    type: 'Too Short',
                    payload: fieldName
                });
            } else if (len >= 5 && inputState.emailField !== '') {
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
                        type: 'Validate Red',
                        payload: fieldName
                    });
                } else { // else, given email is valid
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                }
            }
        }
    }

    return (
        <div className='regForm'>
            {/* NAVIGATION */}
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            {/* BODY */}
            <div className='flexColForm'>
                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Create a password to start your membership</h1>
                <h3>Just a few more steps and you're done!</h3>
                <h3>We hate paperwork, too.</h3>
                <input ref={emailRef} type="text" name="emailField" placeholder="Email" maxLength="50" defaultValue={state.email} style={{ borderColor: inputState.emailField === 'green' ? 'green' : (inputState.emailField !== '' ? 'crimson' : 'none') }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                {inputState.emailField === 'red' && <p style={{ color: 'crimson' }}>Email is required!</p>}
                {inputState.emailField === 'too short' && <p style={{ color: 'crimson' }}>Email should be between 5 and 50 characters</p>}
                {inputState.emailField === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid email address</p>}

                <input ref={passwordRef} type="password" name="passwordField" placeholder="Add a password" style={{ borderColor: inputState.passwordField === 'green' ? 'green' : (inputState.passwordField !== '' ? 'crimson' : 'none') }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                {inputState.passwordField === 'red' && <p style={{ color: 'crimson' }}>Password is required!</p>}
                {inputState.passwordField === 'too short' && <p style={{ color: 'crimson' }}>Password should be between 6 and 60 characters</p>}
                {inputState.passwordField === 'too long' && <p style={{ color: 'crimson' }}>Please shorten your password to 60 characters or less.</p>}
                <button onClick={goToSignUp} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default RegForm;
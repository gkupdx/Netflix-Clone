//// RegForm.js - component for the /signup/regform page (Step 1)

import { useEffect, useRef, useReducer } from 'react';
import { useNavigate, useLocation } from "react-router";

const RegForm = ({ logo }) => {
    let passwordRef = useRef();
    let { state } = useLocation(); // destructure for direct use

    const initialState = {
        passwordField: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            // 'Red Box' = show initial error message + give input field red border
            case 'Red Box':
                return { passwordField: 'red' }
            // 'Green Box' = give nput field green border
            case 'Green Box':
                return { passwordField: 'green' }
            // 'Too Short' = on input of length < 6 characters, show warning
            case 'Too Short':
                return { passwordField: 'too short' }
            // 'Too Long' = on input of length > 60 characters, show warning
            case 'Too Long':
                return { passwordField: 'too long' }
            // 'Valid Click' = password passed validation AND 'Next' button clicked
            case 'Valid Click':
                return { passwordField: 'valid click' }
            default:
                return state;
        }
    }

    const [inputState, dispatch] = useReducer(reducer, initialState);


    // useNavigate()
    let reroute = useNavigate();

    // on logo click, redirect to landing page
    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on button click, move to Step 2 of registration
    const stepTwo = () => {
        let fieldVal = passwordRef.current.value;

        // if length === 0, on BUTTON CLICK, apply 'Red Box' + focus
        if (fieldVal.length === 0) {
            passwordRef.current.focus();
            dispatch({
                type: 'Red Box'
            });
        } else if (fieldVal.length < 6) {
            passwordRef.current.focus();
            dispatch({
                type: 'Too Short'
            });
        } else if (fieldVal.length > 60) {
            dispatch({
                type: 'Too Long'
            });
        } else {
            dispatch({
                type: 'Valid Click'
            });
        }
    }

    // trigger this effect ONLY AFTER password validation + correct state + button click
    // dependencies --> inputState.passwordField, reroute()
    useEffect(() => {
        if (inputState.passwordField === 'valid click') {
            let path = `/signup`;
            reroute(path)
        }
    }, [inputState.passwordField, reroute]);


    // onBlur handler
    const handleOnBlur = (event) => {
        let fieldVal = event.target.value;

        if (fieldVal.length === 0) {    // ask for a password 
            dispatch({
                type: 'Red Box'
            });
        } else if (fieldVal.length > 0 && fieldVal.length < 6) {   
            dispatch({
                type: 'Too Short'
            });
        } else if (fieldVal.length > 60) {
            dispatch({
                type: 'Too Long'
            });
        } else if (fieldVal.length >= 6 && fieldVal.length < 60) {
            dispatch({
                type: 'Green Box'
            });
        }
    }

    // onChange handler (dispatch ONLY IF onBlur event HAS NOT already happened)
    const handleOnChange = (event) => {
        let fieldVal = event.target.value;

        if (fieldVal.length === 0 && inputState.passwordField !== '') {    
            dispatch({
                type: 'Red Box'
            });
        } else if (fieldVal.length > 0 && fieldVal.length < 6 && inputState.passwordField !== '') {  
            dispatch({
                type: 'Too Short'
            });
        } else if (fieldVal.length > 60 && inputState.passwordField !== '') {  
            dispatch({
                type: 'Too Long'
            });
        } else if (fieldVal.length >= 6 && fieldVal.length < 60 && inputState.passwordField !== '') {  
            dispatch({
                type: 'Green Box'
            });
        }
    }

    // error message styling 
    const errorMsgStyle = {
        color: 'crimson'
    }


    return (
        <div className='regForm'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect}/>
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColForm'>
                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Create a password to start your membership</h1>
                <h3>Just a few more steps and you're done!</h3>
                <h3>We hate paperwork, too.</h3>
                <input type="text" name="email" placeholder="Email" value={state.email} style={{ borderColor: state.email ? 'green' : 'none' }}/>
                <input ref={passwordRef} type="password" name="password" placeholder="Add a password" style={{ borderColor: inputState.passwordField === 'green' ? 'green' : (inputState.passwordField !== '' ? 'crimson' : 'none')}} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                {inputState.passwordField === 'red' && <p style={errorMsgStyle}>Password is required!</p>}
                {inputState.passwordField === 'too short' && <p style={errorMsgStyle}>Password should be between 6 and 60 characters</p>}
                {inputState.passwordField === 'too long' && <p style={errorMsgStyle}>Please shorten your password to 60 characters or less.</p>}
                <button onClick={stepTwo} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default RegForm;
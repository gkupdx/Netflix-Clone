//// RegForm.js - component for the /signup/regform page (Step 1)

import { useEffect, useRef, useReducer } from 'react';
import { useNavigate, useLocation } from "react-router";

const RegForm = ({ logo }) => {
    let navigate = useNavigate();
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

    // on button click, move to Step 2 of registration
    const goToSignUp = () => {
        let fieldVal = passwordRef.current.value;
        let len = fieldVal.length;

        // if length === 0, on BUTTON CLICK, apply 'Red Box' + focus
        if (len === 0) {
            passwordRef.current.focus();
            dispatch({
                type: 'Red Box'
            });
        } else if (len < 6) {
            passwordRef.current.focus();
            dispatch({
                type: 'Too Short'
            });
        } else if (len > 60) {
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
    // dependencies --> inputState.passwordField, navigate()
    useEffect(() => {
        if (inputState.passwordField === 'valid click') {
            let path = `/signup`;
            navigate(path)
        }
    }, [inputState.passwordField, navigate]);


    // onBlur handler
    const handleOnBlur = (event) => {
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (len === 0) {    // ask for a password 
            dispatch({
                type: 'Red Box'
            });
        } else if (len > 0 && len < 6) {   
            dispatch({
                type: 'Too Short'
            });
        } else if (len > 60) {
            dispatch({
                type: 'Too Long'
            });
        } else if (len >= 6 && len < 60) {
            dispatch({
                type: 'Green Box'
            });
        }
    }

    // onChange handler (dispatch ONLY IF onBlur event HAS NOT already happened)
    const handleOnChange = (event) => {
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (len === 0 && inputState.passwordField !== '') {    
            dispatch({
                type: 'Red Box'
            });
        } else if (len > 0 && len < 6 && inputState.passwordField !== '') {  
            dispatch({
                type: 'Too Short'
            });
        } else if (len > 60 && inputState.passwordField !== '') {  
            dispatch({
                type: 'Too Long'
            });
        } else if (len >= 6 && len < 60 && inputState.passwordField !== '') {  
            dispatch({
                type: 'Green Box'
            });
        }
    }

    return (
        <div className='regForm'>
            {/* NAVIGATION */}
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')}/>
                <a href='/login'>Sign In</a>
            </div>
            
            {/* BODY */}
            <div className='flexColForm'>
                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Create a password to start your membership</h1>
                <h3>Just a few more steps and you're done!</h3>
                <h3>We hate paperwork, too.</h3>
                <input type="text" name="email" placeholder="Email" value={state.email} style={{ borderColor: state.email ? 'green' : 'none' }}/>
                <input ref={passwordRef} type="password" name="password" placeholder="Add a password" style={{ borderColor: inputState.passwordField === 'green' ? 'green' : (inputState.passwordField !== '' ? 'crimson' : 'none')}} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                {inputState.passwordField === 'red' && <p style={{ color: 'crimson' }}>Password is required!</p>}
                {inputState.passwordField === 'too short' && <p style={{ color: 'crimson' }}>Password should be between 6 and 60 characters</p>}
                {inputState.passwordField === 'too long' && <p style={{ color: 'crimson' }}>Please shorten your password to 60 characters or less.</p>}
                <button onClick={goToSignUp} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default RegForm;
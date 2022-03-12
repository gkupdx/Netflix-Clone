//// RegForm.js - component for the /signup/regform page (Step 1)

import { useReducer } from 'react';
import { useNavigate } from "react-router";

const RegForm = ({ logo }) => {
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
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

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

        if (fieldVal.length === 0 && state.passwordField !== '') {    
            dispatch({
                type: 'Red Box'
            });
        } else if (fieldVal.length > 0 && fieldVal.length < 6 && state.passwordField !== '') {  
            dispatch({
                type: 'Too Short'
            });
        } else if (fieldVal.length > 60 && state.passwordField !== '') {  
            dispatch({
                type: 'Too Long'
            });
        } else if (fieldVal.length >= 6 && fieldVal.length < 60 && state.passwordField !== '') {  
            dispatch({
                type: 'Green Box'
            });
        }
    }

    // useNavigate()
    let reroute = useNavigate();

    // on logo click, redirect to landing page
    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on button click, move to Step 2 of registration
    const stepTwo = () => {
        let path =`/signup`;
        reroute(path);
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
                <input type="text" name="email" placeholder="Email"/>
                <input type="text" name="password" placeholder="Add a password" style={{ borderColor: state.passwordField === 'green' ? 'green' : (state.passwordField !== '' ? 'crimson' : 'none')}} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                {state.passwordField === 'red' && <p style={errorMsgStyle}>Password is required!</p>}
                {state.passwordField === 'too short' && <p style={errorMsgStyle}>Password should be between 6 and 60 characters</p>}
                {state.passwordField === 'too long' && <p style={errorMsgStyle}>Please shorten your password to 60 characters or less.</p>}
                <button onClick={stepTwo} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default RegForm;
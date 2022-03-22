//// GiftOption.js - component for the /signup/giftoption route

import { useState, useReducer } from 'react';
import { useNavigate, useLocation } from "react-router";

const GiftOption = ({ logo }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    let { state } = useLocation();

    const initialState = {
        giftCode: '',
        zipCode: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            // 'Red Box' = display error message below input field + give input field a red border 
            case 'Red Box':
                return {
                    ...state,
                    [action.payload]: 'red'
                }
            // 'Green Box' = give input field a green border
            case 'Green Box':
                return {
                    ...state,
                    [action.payload]: 'green'
                }
            // 'Validate Red' = on some input, validate input is correct characters + length
            case 'Validate Red':
                return {
                    ...state,
                    [action.payload]: 'validate red'
                }
            // 'Verify Fields' = see which fields are empty & highlight those fields
            case 'Verify Fields':
                // if default state, return error values for both
                if (state === initialState) {
                    return {
                        giftCode: 'red',
                        zipCode: 'red'
                    }
                } else {
                    let stateArray = Object.entries(state);

                    let filteredArray = stateArray.filter(([key, value]) => value === '');

                    filteredArray.forEach((index) => {
                        index[1] = 'red';
                    });

                    let updatedStateObj = Object.fromEntries(filteredArray);

                    state = updatedStateObj;

                    return state;
                }
            default:
                return state;
        }
    }

    const [inputState, dispatch] = useReducer(reducer, initialState);

    // onBlur handler
    const handleOnBlur = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        if (fieldVal.length === 0) {
            dispatch({
                type: 'Red Box',
                payload: fieldName
            });
        } else if ((fieldName === 'giftCode' && fieldVal.length < 4) || (fieldName === 'zipCode' && (fieldVal.length < 5 || fieldVal.length > 5))) {
            dispatch({
                type: 'Validate Red',
                payload: fieldName
            });
        } else if ((fieldName === 'giftCode' && fieldVal.length >= 4) || (fieldName === 'zipCode' && fieldVal.length === 5)) {
            dispatch({
                type: 'Green Box',
                payload: fieldName
            });
        }
    }

    // onChange handler (dispatch ONLY IF onBlur event HAS NOT already happened)
    const handleOnChange = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;

        if (fieldVal.length === 0) {
            dispatch({
                type: 'Red Box',
                payload: fieldName
            });
        } else if ((fieldName === 'giftCode' && fieldVal.length < 4 && inputState.giftCode !== '') || (fieldName === 'zipCode' && inputState.zipCode !== '' && (fieldVal.length < 5 || fieldVal.length > 5))) {
            dispatch({
                type: 'Validate Red',
                payload: fieldName
            });
        } else if ((fieldName === 'giftCode' && fieldVal.length >= 4 && inputState.giftCode !== '') || (fieldName === 'zipCode' && fieldVal.length === 5 && inputState.zipCode !== '')) {
            dispatch({
                type: 'Green Box',
                payload: fieldName
            });
        }
    }

    // styling of different elements
    const monthlyChargeStyle = {
        fontSize: "0.85rem",
        fontWeight: "700",
        marginTop: "0"
    }

    const currentPlanStyle = {
        fontSize: "0.85rem",
        fontWeight: "500",
        color: "grey",
        marginTop: "0"
    }

    const errorMsgStyle = {
        color: 'crimson',
        marginTop: '0'
    }


    return (
        <div className='giftOption'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            <div className={!show ? 'flexColGift' : 'flexColGiftMb'}>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Enter your gift code</h1>
                </div>
                <div>
                    <input type="text" name="giftCode" placeholder="Gift Card Pin or Code" maxLength="60" style={{ borderColor: (inputState.giftCode === 'red' || inputState.giftCode === 'validate red') ? 'crimson' : inputState.giftCode === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {inputState.giftCode === 'red' && <p style={errorMsgStyle}>Gift Card Pin or Code is required!</p>}
                    {inputState.giftCode === 'validate red' && <p style={errorMsgStyle}>Gift Card Pin or Code should be between 4 and 60 characters!</p>}
        
                    <input type="text" name="zipCode" placeholder="Zip Code" style={{ borderColor: (inputState.zipCode === 'red' || inputState.zipCode === 'validate red') ? 'crimson' : inputState.zipCode === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {inputState.zipCode === 'red' && <p style={errorMsgStyle}>Zip Code is required!</p>}
                    {inputState.zipCode === 'validate red' && <p style={errorMsgStyle}>Please enter a valid ZIP code.</p>}

                    <div className='currentPlanDiv'>
                        <div>
                            <p style={monthlyChargeStyle}>{state.price}</p>
                            <p style={currentPlanStyle}>{state.planName}</p>
                        </div>

                        <button onClick={() => navigate('/signup/editplan')}>Change</button>
                    </div>
                </div>

                <button onClick={() => dispatch({ type: 'Verify Fields' })}className='redeemCodeBtn'>Redeem Gift Code</button>

                <p className='captcha'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={!show ? 'learnMore' : 'hidden'} onClick={() => setShow(true)}>Learn more.</span></p>
                {show && <p className='learnMoreDetails'>The information collected by Google reCAPTCHA is subject to the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a>, and is used for providing, maintaining, and improving the reCAPTCHA service
                    and for general security purposes (it is not used for personalized advertising by Google).
                </p>}
            </div>
        </div>
    )
}

export default GiftOption;
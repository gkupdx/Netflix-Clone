//// CreditOption.js - component for the /signup/creditoption route

import { useRef, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router';

import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import amex from '../assets/amex.svg';
import discover from '../assets/discover.png';

import { VscQuestion } from 'react-icons/vsc';

const CreditOption = ({ logo, svgStyle, pngStyle }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const firstNameRef = useRef();

    // initial state for reducer
    const initialState = {
        firstName: '',
        lastName: '',
        cardNum: '',
        expDate: '',
        cvv: '',
        zipCode: ''
    };

    // reducer for the credit/debit input fields
    const reducer = (state, action) => {
        switch (action.type) {
            // 'Red Box' = display error message below input field + give input field a red border 
            case 'Red Box':
                return {
                    ...state,
                    [action.payload]: 'red'
                }
            // 'Green Box' = give input field a green border if it passes validation
            case 'Green Box':
                return {
                    ...state,
                    [action.payload]: 'green'
                }
            // 'Validate Red' = given an input, validate the input according to each field's conditional logic
            case 'Validate Red':
                return {
                    ...state,
                    [action.payload]: 'validate red'
                }
            // 'Ask for Year' = on initial month input, ask for the expiration year
            case 'Ask For Year':
                return {
                    ...state,
                    expDate: 'year'
                }
            // 'Validate Year' = given month & year, validate year value
            case 'Validate Year':
                return {
                    ...state,
                    expDate: 'validate year'
                }
            // 'Verify Fields' = see which fields are empty & highlight those fields after 'Start Membership' click
            case 'Verify Fields':
                // if default state, return error values for ALL fields
                if (state === initialState) {
                    return {
                        firstName: 'red',
                        lastName: 'green',
                        cardNum: 'red',
                        expDate: 'red',
                        cvv: 'red',
                        zipCode: 'red'
                    }
                } else {
                    // convert current state object to array
                    let stateArray = Object.entries(state);

                    // loop through array OF ARRAYS (length 2)
                    // for each INDEX (total: 6), 
                    // --> INDEX[0] = Key (e.g. 'firstName')
                    // --> INDEX[1] = Value (e.g. 'red')
                    stateArray.forEach((index) => {
                        // set 'lastName' key to 'green' if in default state
                        if (index[0] === 'lastName' && index[1] === '') {
                            index[1] = 'green'
                        } else {
                            if (index[0] === 'firstName') {
                                firstNameRef.current.focus(); // apply focus on 'firstName' field
                            }
                            
                            // set all other fields to 'red' if in default state
                            if (index[1] === '') {
                                index[1] = 'red'
                            }
                        }
                    });

                    // convert array back into object
                    let updatedStateObj = Object.fromEntries(stateArray);

                    // store object as new state
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
        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal);
        let numRegex = /^\d+$/.test(fieldVal);
        let len = fieldVal.length; // store field value's length for reusability

        // apply for ALL fields (except "lastName")
        if (len === 0 && fieldName !== 'lastName') {
            dispatch({
                type: 'Red Box',
                payload: fieldName
            });
        }
        // "firstName" onBlur
        else if (fieldName === 'firstName') {
            if (len >= 4 && !alphaRegex) {  // if input length >= 4 and is NON-alphabet, show error
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            } else {    // input passes (before onChange...)
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            }
        }
        // "lastName" onBlur
        else if (fieldName === 'lastName') {
            if (len >= 4 && !alphaRegex) {  // if input length >= 4 and is NON-alphabet, show error
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            } else {    // input passes (before onChange...)
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            }
        }
        // "cardNum" onBlur for Visa, MasterCard, Amex, & Discover Card
        // BASIC validation (i.e. does not handle every edge case because range of possible credit card numbers is TOO wide)
        else if (fieldName === 'cardNum') {
            if (len < 13) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            } else {  
                let charAtZero = fieldVal.charAt(0); // store char @ index 0 for resuability
                let firstTwo = fieldVal.substring(0, 2); // grab first 2 characters of input (MasterCard test)
                let isInRange = parseInt(firstTwo); // convert to int & make sure its within range 51-55 (MasterCard test)

                // Visa: (starts with 4) && (length 13 || 16)
                if (charAtZero === '4' && (len === 13 || len === 16) && numRegex) {
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                }
                // MasterCard: (starts with 51 thru 55) && (length 16) 
                else if ((isInRange >= 51 && isInRange <= 55) && len === 16 && numRegex) {
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                } 
                // Amex - (starts with 34 || 37) && (length 15)
                else if ((firstTwo === '34' || firstTwo === '37') && len === 15 && numRegex) {
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                } 
                // Discover - [(starts with 6011) && (length 16) || (starts with 5) && (length 15)]
                else if (((fieldVal.substring(0, 4) === '6011' && len === 16) || (charAtZero === '5' && len === 15)) && numRegex) {
                     dispatch({
                         type: 'Green Box',
                         payload: fieldName
                     });
                } 
                else {
                    dispatch({
                        type: 'Validate Red',
                        payload: fieldName
                    });
                }
            }
        }
        // "expDate" onBlur
        else if (fieldName === 'expDate') {
            if (len === 5 && numRegex) {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            } else if (len >= 1 && len < 4 && numRegex) {
                dispatch({
                    type: 'Ask For Year'
                });
            } else if ((len > 5 || len === 4) && numRegex) {
                dispatch({
                    type: 'Validate Year'
                });
            } else if (len > 0 && !numRegex) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            }
        }
        // "cvv" onBlur 
        else if (fieldName === 'cvv') {
            if (len === 3 || len === 4) {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            } else if (len > 0 && len < 3) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            }
        }
        // "zipCode" onBlur
        else if (fieldName === 'zipCode') {
            if (len === 5 && numRegex) {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            } else if (len < 5 || len > 5 || (len === 5 && !numRegex)) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            }
        }
    };

    // onChange handler (dispatch ONLY IF onBlur event HAS NOT already happened)
    const handleOnChange = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal); // regex to check for ONLY alphabets in input
        let numRegex = /^\d+$/.test(fieldVal); // regex to check for ONLY numbers in input
        let len = fieldVal.length;

        // apply for ALL fields (except "lastName")
        if (len === 0 && fieldName !== 'lastName') {
            dispatch({
                type: 'Red Box',
                payload: fieldName
            });
        }
        // "firstName" onChange
        else if (fieldName === 'firstName' && inputState.firstName !== '') {
            if (len <= 3) { // change border color from red to green on input length 0~3
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            } else if (len >= 4 && !alphaRegex) { // change error message if first 4 characters are non-alphabets
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            }
        }
        // "lastName" onChange
        else if (fieldName === 'lastName' && inputState.lastName !== '') {
            if (len >= 4 && !alphaRegex) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            } else {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            }
        }
        // "cardNum" onChange 
        else if (fieldName === 'cardNum' && inputState.cardNum !== '') {
            if (len < 13) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            } else {  
                let charAtZero = fieldVal.charAt(0); // store char @ index 0 for resuability
                let firstTwo = fieldVal.substring(0, 2); // grab first 2 characters of input (MasterCard test)
                let isInRange = parseInt(firstTwo); // convert to int & make sure its within range 51-55 (MasterCard test)

                // Visa: (starts with 4) && (length 13 || 16)
                if (charAtZero === '4' && (len === 13 || len === 16) && numRegex) {
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                }
                // MasterCard: (starts with 51 thru 55) && (length 16) 
                else if ((isInRange >= 51 && isInRange <= 55) && len === 16 && numRegex) {
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                } 
                // Amex - (starts with 34 || 37) && (length 15)
                else if ((firstTwo === '34' || firstTwo === '37') && len === 15 && numRegex) {
                    dispatch({
                        type: 'Green Box',
                        payload: fieldName
                    });
                } 
                // Discover - [(starts with 6011) && (length 16) || (starts with 5) && (length 15)]
                else if (((fieldVal.substring(0, 4) === '6011' && len === 16) || (charAtZero === '5' && len === 15)) && numRegex) {
                     dispatch({
                         type: 'Green Box',
                         payload: fieldName
                     });
                } 
                else {
                    dispatch({
                        type: 'Validate Red',
                        payload: fieldName
                    });
                }
            }
        }
        // "expDate" onChange
        else if (fieldName === 'expDate' && inputState.expDate !== '') {
            if (numRegex && len === 5) {   // change border color from red to green on correct input
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            } else if (numRegex && len >= 1 && len < 4) { // change error message to ask for expiration year
                dispatch({
                    type: 'Ask For Year'
                });
            } else if ((len === 4 || len > 5) && numRegex) {
                dispatch({
                    type: 'Validate Year'
                });
            } else if (!numRegex) {    // change error message to ask for a valid expiration month
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            }
        }
        // "cvv" onChange
        else if (fieldName === 'cvv' && inputState.cvv !== '') {
            if (len === 3 || len === 4) {   // change from red to green on input length 3 or 4
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            } else if (len < 3) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            }
        }
        // "zipCode" onChange
        else if (fieldName === 'zipCode' && inputState.zipCode !== '') {
            if (len < 5 || len > 5) {
                dispatch({
                    type: 'Validate Red',
                    payload: fieldName
                });
            } else if (len === 5 && numRegex) {
                dispatch({
                    type: 'Green Box',
                    payload: fieldName
                });
            }
        }
    }

    return (
        <div className='creditOption'>
            {/* NAVIGATION */}
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            {/* BODY */}
            <div className='flexColCredit'>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Set up your credit or debit card</h1>
                </div>
                <div>
                    <img src={visa} alt="Visa SVG" style={svgStyle} />
                    <img src={mastercard} alt="MasterCard SVG" style={svgStyle} />
                    <img src={amex} alt="American Express SVG" style={svgStyle} />
                    <img src={discover} alt="Discover card PNG" style={pngStyle} />
                </div>
                <div>
                    <input ref={firstNameRef} type="text" name="firstName" placeholder="First Name" style={{ borderColor: (inputState.firstName === 'red' || inputState.firstName === 'validate red') ? 'crimson' : inputState.firstName === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {inputState.firstName === 'red' && <p style={{ color: 'crimson' }}>Please enter a first name.</p>}
                    {inputState.firstName === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid first name</p>}


                    <input type="text" name="lastName" placeholder="Last name" style={{ borderColor: inputState.lastName === 'green' ? 'green' : inputState.lastName === 'validate red' ? 'crimson' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {inputState.lastName === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid last name</p>}


                    <input type="text" name="cardNum" placeholder="Card number" maxLength="19" style={{ borderColor: (inputState.cardNum === 'red' || inputState.cardNum === 'validate red') ? 'crimson' : inputState.cardNum === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {inputState.cardNum === 'red' && <p style={{ color: 'crimson' }}>Please enter a card number.</p>}
                    {inputState.cardNum === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid credit card number.</p>}


                    <input type="text" name="expDate" placeholder="Expiration date (MM/YY)" style={{ borderColor: (inputState.expDate === 'red' || inputState.expDate === 'validate red' || inputState.expDate === 'year' || inputState.expDate === 'validate year') ? 'crimson' : inputState.expDate === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {inputState.expDate === 'red' && <p style={{ color: 'crimson' }}>Please enter an expiration month.</p>}
                    {inputState.expDate === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid expiration month.</p>}
                    {inputState.expDate === 'year' && <p style={{ color: 'crimson' }}>Please enter an expiration year.</p>}
                    {inputState.expDate === 'validate year' && <p style={{ color: 'crimson' }}>The expiration year must be between 2022 and 2047.</p>}


                    <input type="text" name="cvv" placeholder="Security code (CVV)" maxLength="4" style={{ borderColor: (inputState.cvv === 'red' || inputState.cvv === 'validate red') ? 'crimson' : inputState.cvv === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} /><span className='inputIcon'><VscQuestion style={{ color: "#bfbfbf", fontSize: "2.6rem" }} /></span>
                    {inputState.cvv === 'red' && <p style={{ color: 'crimson' }}>Please enter a security code (CVV).</p>}
                    {inputState.cvv === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid CVV code.</p>}
           

                    <input type="text" name="zipCode" placeholder="Billing ZIP code" style={{ borderColor: (inputState.zipCode === 'red' || inputState.zipCode === 'validate red') ? 'crimson' : inputState.zipCode === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {inputState.zipCode === 'red' && <p style={{ color: 'crimson' }}>Please enter a billing zip code.</p>}
                    {inputState.zipCode === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid zip code</p>}

                    <div className='currentPlanDiv'>
                        <div>
                            <p style={{ fontSize: "0.85rem", fontWeight: "700" }}>{state.price}</p>
                            <p style={{ fontSize: "0.85rem", fontWeight: "500", color: "grey" }}>{state.planName}</p>
                        </div>

                        <button onClick={() => navigate('/signup/editplan')}>Change</button>
                    </div>
                </div>
                <div>
                    <p className='membershipDetails'>
                        By clicking the "Start Membership" button below, you agree to
                        our <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a>,
                        <a href="https://help.netflix.com/legal/privacy">Privacy Statement</a>, that you
                        are over 18, and that <b>Netflix will automatically continue your membership
                            and charge the membership fee (currently $19.99/month) to your payment
                            method until you cancel. You may cancel at any time to avoid future charges.
                        </b>. To cancel, go to Account and click "Cancel Membership".
                    </p>
                </div>

                <button onClick={() => dispatch({ type: 'Verify Fields' })} className='startMembershipBtn'>Start Membership</button>
            </div>
        </div>
    )
}

export default CreditOption;
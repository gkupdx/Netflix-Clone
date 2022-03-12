//// CreditOption.js - component for the /signup/creditoption route

import { useReducer } from 'react';
import { useNavigate } from 'react-router';

import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import amex from '../assets/amex.svg';
import discover from '../assets/discover.png';

import { VscQuestion } from 'react-icons/vsc';

const CreditOption = ({ logo }) => {
    // ensures non-empty input fields
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
                    [action.name]: 'red'
                }
            // 'Green Box' = give input field a green border if it passes validation
            case 'Green Box':
                return {
                    ...state,
                    [action.name]: 'green'
                }
            // 'Validate Red' = given an input, validate the input according to each field's conditional logic
            case 'Validate Red':
                return {
                    ...state,
                    [action.name]: 'validate red'
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
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // onBlur handler
    const handleOnBlur = (event) => {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal);
        let numRegex = /^\d+$/.test(fieldVal);

        // apply for ALL fields (except "lastName")
        if (fieldVal.length === 0 && fieldName !== 'lastName') {
            dispatch({
                type: 'Red Box',
                name: fieldName
            });
        }
        // "firstName" onBlur
        else if (fieldName === 'firstName') {
            if (fieldVal.length >= 4 && !alphaRegex) {  // if input length >= 4 and is NON-alphabet, show error
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } else {    // input passes (before onChange...)
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            }
        }
        // "lastName" onBlur
        else if (fieldName === 'lastName') {
            if (fieldVal.length >= 4 && !alphaRegex) {  // if input length >= 4 and is NON-alphabet, show error
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } else {    // input passes (before onChange...)
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            }
        }
        // * WORK ON THIS LATER *
        // "cardNum" onBlur (only handles the MOST POPULAR cards i.e. Visa, MasterCard, Amex, Discover)
        else if (fieldName === 'cardNum') {
            if (fieldVal.length < 13) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            }
            // } else if (fieldVal.length > 0) {   // PSEUDO-CODE - test different cards

            //     // Visa: (starts with 4) && (length 13 || 16)
            //     // MasterCard: (starts with 51 thru 55) && (length 16)
            //     // Amex - (starts with 34 || 37) && (length 15)
            //     // Discover - [(starts with 6011) && (length 16) || (starts with 5) && (length 15)]

            // }
        }
        // "expDate" onBlur
        else if (fieldName === 'expDate') {
            if (fieldVal.length === 5 && numRegex) {
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (fieldVal.length >= 1 && fieldVal.length < 4 && numRegex) {
                dispatch({
                    type: 'Ask For Year'
                });
            } else if ((fieldVal.length > 5 || fieldVal.length === 4) && numRegex) {
                dispatch({
                    type: 'Validate Year'
                });
            } else if (fieldVal.length > 0 && !numRegex) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            }
        }
        // "cvv" onBlur 
        else if (fieldName === 'cvv') {
            if (fieldVal.length === 3 || fieldVal.length === 4) {
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (fieldVal.length > 0 && fieldVal.length < 3) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            }
        }
        // "zipCode" onBlur
        else if (fieldName === 'zipCode') {
            if (fieldVal.length === 5 && numRegex) {
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (fieldVal.length < 5 || fieldVal.length > 5 || (fieldVal.length === 5 && !numRegex)) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
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


        // apply for ALL fields (except "lastName")
        if (fieldVal.length === 0 && fieldName !== 'lastName') {
            dispatch({
                type: 'Red Box',
                name: fieldName
            });
        }
        // "firstName" onChange
        else if (fieldName === 'firstName' && state.firstName !== '') {
            if (fieldVal.length <= 3) { // change border color from red to green on input length 0~3
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (fieldVal.length >= 4 && !alphaRegex) { // change error message if first 4 characters are non-alphabets
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } 
        } 
        // "lastName" onChange
        else if (fieldName === 'lastName' && state.lastName !== '') {
            if (fieldVal.length >= 4 && !alphaRegex) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } else {
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            }
        }
        // "cardNum" onChange (only handles the MOST POPULAR cards i.e. Visa, MasterCard, Amex, Discover)
        else if (fieldName === 'cardNum' && state.cardNum !== '') {
            if (fieldVal.length >= 13 && fieldVal.length <= 19 && numRegex) {  // change border color from red to green on input length 13~19
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (fieldVal.length < 13) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            }
        }
        // "expDate" onChange
        else if (fieldName === 'expDate' && state.expDate !== '') {
            if (numRegex && fieldVal.length === 5) {   // change border color from red to green on correct input
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (numRegex && fieldVal.length >= 1 && fieldVal.length < 4) { // change error message to ask for expiration year
                dispatch({
                    type: 'Ask For Year'
                });
            } else if ((fieldVal.length === 4 || fieldVal.length > 5) && numRegex) {
                dispatch({
                    type: 'Validate Year'
                });
            } else if (!numRegex) {    // change error message to ask for a valid expiration month
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } 
        }
        // "cvv" onChange
        else if (fieldName === 'cvv' && state.cvv !== '') {
            if (fieldVal.length === 3 || fieldVal.length === 4) {   // change from red to green on input length 3 or 4
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            } else if (fieldVal.length < 3) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } 
        }
        // "zipCode" onChange
        else if (fieldName === 'zipCode' && state.zipCode !== '') {
            if (fieldVal.length < 5 || fieldVal.length > 5) {
                dispatch({
                    type: 'Validate Red',
                    name: fieldName
                });
            } else if (fieldVal.length === 5 && numRegex) {
                dispatch({
                    type: 'Green Box',
                    name: fieldName
                });
            }
        }
    }

    // useNavigate()
    const reroute = useNavigate();

    // on logo click, redirect to landing page
    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on btn click, redirect to Payment page
    const returnToPayment = () => {
        let path = `/signup/payment`
        reroute(path);
    }

    // SVG styling 
    const svgStyle = {
        width: "60px",
        height: "25px"
    }
    // Discover card PNG styling 
    const pngStyle = {
        width: "40px",
        height: "25px"
    }
    // CVV question icon styling
    const cvvQuestionStyle = {
        fontSize: "2.5rem",
        color: "lightgrey"
    }
    // Price per month styling
    const monthlyChargeStyle = {
        fontSize: "0.85rem",
        fontWeight: "700"
    }
    // Current selected plan styling
    const currentPlanStyle = {
        fontSize: "0.85rem",
        fontWeight: "500",
        color: "grey"
    }

    return (
        <div className='creditOption'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

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
                    <input type="text" name="firstName" placeholder="First Name" style={{ borderColor: (state.firstName === 'red' || state.firstName === 'validate red') ? 'crimson' : state.firstName === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {state.firstName === 'red' && <p style={{ color: 'crimson' }}>Please enter a first name.</p>}
                    {state.firstName === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid first name</p>}

                    <input type="text" name="lastName" placeholder="Last name" style={{ borderColor: state.lastName === 'green' ? 'green' : state.lastName === 'validate red' ? 'crimson' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {state.lastName === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid last name</p>}

                    <input type="text" name="cardNum" placeholder="Card number" maxLength="19" style={{ borderColor: (state.cardNum === 'red' || state.cardNum === 'validate red') ? 'crimson' : state.cardNum === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {state.cardNum === 'red' && <p style={{ color: 'crimson' }}>Please enter a card number.</p>}
                    {state.cardNum === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid credit card number.</p>}

                    <input type="text" name="expDate" placeholder="Expiration date (MM/YY)" style={{ borderColor: (state.expDate === 'red' || state.expDate === 'validate red' || state.expDate === 'year' || state.expDate === 'validate year') ? 'crimson' : state.expDate === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                    {state.expDate === 'red' && <p style={{ color: 'crimson' }}>Please enter an expiration month.</p>}
                    {state.expDate === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid expiration month.</p>}
                    {state.expDate === 'year' && <p style={{ color: 'crimson' }}>Please enter an expiration year.</p>}
                    {state.expDate === 'validate year' && <p style={{ color: 'crimson' }}>The expiration year must be between 2022 and 2047.</p>}

                    <div>
                        <input type="text" name="cvv" placeholder="Security code (CVV)" maxLength="4" style={{ borderColor: (state.cvv === 'red' || state.cvv === 'validate red') ? 'crimson' : state.cvv === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)} />
                        {state.cvv === 'red' && <p style={{ color: 'crimson' }}>Please enter a security code (CVV).</p>}
                        {state.cvv === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid CVV code.</p>}
                        <div className='inputIcon'><VscQuestion style={cvvQuestionStyle} /></div>
                    </div>

                    <input type="text" name="zipCode" placeholder="Billing ZIP code" style={{ borderColor: (state.zipCode === 'red' || state.zipCode === 'validate red') ? 'crimson' : state.zipCode === 'green' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {state.zipCode === 'red' && <p style={{ color: 'crimson' }}>Please enter a billing zip code.</p>}
                    {state.zipCode === 'validate red' && <p style={{ color: 'crimson' }}>Please enter a valid zip code</p>}

                    <div className='currentPlanDiv'>
                        <div>
                            <p style={monthlyChargeStyle}>$19.99/month</p>
                            <p style={currentPlanStyle}>Premium Plan</p>
                        </div>

                        <button onClick={returnToPayment}>Change</button>
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

                <button className='startMembershipBtn'>Start Membership</button>
            </div>
        </div>
    )
}

export default CreditOption;
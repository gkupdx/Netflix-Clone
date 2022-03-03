//// CreditOption.js - component for the /signup/creditoption route

import { useNavigate } from 'react-router';

import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import amex from '../assets/amex.svg';
import discover from '../assets/discover.png';

const CreditOption = ({ logo }) => {
    const reroute = useNavigate();

    const redirect = () => {
        let path = `/`;
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

    // Price per month styling
    const monthlyChargeStyle = {
        fontSize: "0.85rem",
        fontWeight: "bold"
    }

    // Current selected plan styling
    const currentPlanStyle = {
        fontSize: "0.85rem",
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
                    <input type="text" name="firstName" placeholder="First Name" />
                    <input type="text" name="lastName" placeholder="Last name" />
                    <input type="text" name="cardNumber" placeholder="Card number" />
                    <input type="text" name="expDate" placeholder="Expiration date (MM/YY)" />
                    <input type="text" name="cvv" placeholder="Security code (CVV)" />
                    <input type="text" name="zipCode" placeholder="Billing ZIP code" />
                    <div className='currentPlanDiv'>
                        <div>
                            <p style={monthlyChargeStyle}>$19.99/month</p>
                            <p style={currentPlanStyle}>Premium Plan</p>
                        </div>

                        <button>Change</button>
                    </div>
                </div>
                <div>
                    <p className='membershipDetails'>
                        By clicking the "Start Membership" button below, you agree to
                        our <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a>,
                        <a href="https://help.netflix.com/legal/privacy">Privacy Statement</a>, that you
                        are over 18, and that <b>Netflix will automatically continue your membership
                            and charge the membership fee (currently [price per month]) to your payment
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
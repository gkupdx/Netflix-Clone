//// GiftOption.js - component for the /signup/giftoption route

import { useState } from 'react';
import { useNavigate } from "react-router";

const GiftOption = ({ logo }) => {
    const [show, setShow] = useState(false);

    const reroute = useNavigate();

    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on btn click, redirect to Payment page
    const returnToPayment = () => {
        let path = `/signup/payment`
        reroute(path);
    }

    const displayLearnMore = () => {
        setShow(true);
    }

    const monthlyChargeStyle = {
        fontSize: "0.85rem",
        fontWeight: "bold",
        marginTop: "0"
    }

    const currentPlanStyle = {
        fontSize: "0.85rem",
        color: "grey",
        marginTop: "0"
    }

    // // Simple validation functions to make sure field is not empty
    // const giftCodeValidation = {

    // }

    // const zipCodeValidation = {}


    return (
        <div className='giftOption'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

            <div className={!show ? 'flexColGift' : 'flexColGiftMb'}>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Enter your gift code</h1>
                </div>
                <div>
                    <input type="text" name="giftCode" placeholder="Gift Card Pin or Code" />
                    <input type="text" name="zipCode" placeholder="Zip Code" />
                    <div className='currentPlanDiv'>
                        <div>
                            <p style={monthlyChargeStyle}>$19.99</p>
                            <p style={currentPlanStyle}>Premium Plan</p>
                        </div>

                        <button onClick={returnToPayment}>Change</button>
                    </div>
                </div>

                <button className='redeemCodeBtn'>Redeem Gift Code</button>

                <p className='captcha'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className={!show ? 'learnMore' : 'hidden'} onClick={displayLearnMore}>Learn more.</span></p>
                {show && <p className='learnMoreDetails'>The information collected by Google reCAPTCHA is subject to the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a>, and is used for providing, maintaining, and improving the reCAPTCHA service
                    and for general security purposes (it is not used for personalized advertising by Google).
                </p>}
            </div>
        </div>
    )
}

export default GiftOption;
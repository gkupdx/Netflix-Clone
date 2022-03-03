//// GiftOption.js - component for the /signup/giftoption route

import { useNavigate } from "react-router";

const GiftOption = ({ logo }) => {
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


    return (
        <div className='giftOption'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColGift'>
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

                <p className='captcha'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='learnMore'>Learn more.</span></p>
            </div>
        </div>
    )
}

export default GiftOption;
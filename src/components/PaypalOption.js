//// PaypalOption.js - component for the /signup/paypaloption route

import { useNavigate } from "react-router";

const PaypalOption = ({ logo }) => {
    let reroute = useNavigate();

    let redirect = () => {
        let path = `/`;
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
        <div className='paypalOption'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColPaypal'>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Set up your PayPal</h1>
                </div>
                <div>
                    <div className='currentPlanDiv'>
                        <div>
                            <p style={monthlyChargeStyle}>$19.99/month</p>
                            <p style={currentPlanStyle}>Premium Plan</p>
                        </div>

                        <button>Change</button>
                    </div>
                </div>
                <div>
                    <h3>
                        To finish signup, click the <b>Continue to PayPal</b> button
                        and log in to PayPal using your email and password.
                    </h3>
                </div>

                <button className='payPalBtn'>Continue to PayPal</button>
            </div>
        </div>
    )
}

export default PaypalOption;
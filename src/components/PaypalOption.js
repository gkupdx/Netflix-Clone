//// PaypalOption.js - component for the /signup/paypaloption route

import { useNavigate, useLocation } from "react-router";

const PaypalOption = ({ logo }) => {
    let navigate = useNavigate();
    let { state } = useLocation();

    return (
        <div className='paypalOption'>
            {/* NAVIGATION */}
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            {/* BODY */}
            <div className='flexColPaypal'>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Set up your PayPal</h1>
                </div>
                <div>
                    <div className='currentPlanDiv'>
                        <div>
                            <p className='price' style={{ marginTop: "0" }}>{state.price}</p>
                            <p className='planName' style={{ marginTop: "0" }}>{state.planName}</p>
                        </div>

                        <button onClick={() => navigate('/signup/editplan')}>Change</button>
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
//// Payment.js - component for /signup/payment (Step 3)

import { useNavigate, useLocation } from "react-router";

import { MdLockOutline } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';

import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import amex from '../assets/amex.svg';
import discover from '../assets/discover.png';
import paypal from '../assets/paypal.svg';
import giftcard from '../assets/netflix_giftcard.svg';

const Payment = ({ logo, chevronRight, svgStyle, pngStyle }) => {
    const navigate = useNavigate();
    let { state } = useLocation();

    // on <div> click, go to corresponding page
    const goToCredit = () => {
        let path = `/signup/creditoption`;

        navigate(path, {
            state: {
                price: state.price,
                planName: state.planName
            }
        });
    }

    const goToPaypal = () => {
        let path = `/signup/paypaloption`;

        navigate(path, {
            state: {
                price: state.price,
                planName: state.planName
            }
        });
    }

    const goToGift = () => {
        let path = `/signup/giftoption`;

        navigate(path, {
            state: {
                price: state.price,
                planName: state.planName
            }
        });
    }


    return (
        <div className='payment'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColPayment'>
                <div>
                    <MdLockOutline style={{ color: "#e50914", fontSize: "2.5rem" }} />
                </div>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Choose how to pay</h1>
                </div>
                <div>
                    <h2>Your payment is encrypted and you can change how you pay anytime.</h2>
                </div>
                <div>
                    <h3>Secure for peace of mind.</h3>
                    <h3>Cancel easily online.</h3>
                </div>

                <div>
                    <p className='secureServer'>End-to-end encrypted <IoIosLock style={{ color: "#f9be08", fontSize: "1rem" }} /></p>
                    <div onClick={goToCredit} className='creditDiv'>
                        <div className={window.innerWidth < 576 ? 'creditFlexCol' : 'creditFlexRow'}>
                            <div>
                                <p>Credit or Debit Card</p>
                            </div>
                            <div>
                                <img src={visa} alt="Visa SVG" style={svgStyle} />
                                <img src={mastercard} alt="MasterCard SVG" style={svgStyle} />
                                <img src={amex} alt="American Express SVG" style={svgStyle} />
                                <img src={discover} alt="Discover card PNG" style={pngStyle} />
                            </div>
                        </div>
                        <div>
                            {chevronRight}
                        </div>
                    </div>
                </div>

                <div>
                    <div onClick={goToPaypal} className='paypalGiftDiv'>
                        <div className='paypalGiftFlexRow'>
                            <p>PayPal</p>
                            <img src={paypal} alt="PayPal SVG" style={svgStyle} />
                        </div>
                        <div>
                            {chevronRight}
                        </div>
                    </div>
                </div>

                <div>
                    <div onClick={goToGift} className='paypalGiftDiv'>
                        <div className='paypalGiftFlexRow'>
                            <p>Gift Code</p>
                            <img src={giftcard} alt="Netflix Gift Card SVG" style={svgStyle} />
                        </div>
                        <div>
                            {chevronRight}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
//// Payment.js - component for /signup/payment (Step 3)

import { useState, useEffect } from "react";
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
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    let { state } = useLocation();

    // on <div> click, go to CreditOption page
    // and pass-on selected plan info received from PlanForm.js
    const goToCredit = () => {
        let path = `/signup/creditoption`;

        navigate(path, {
            state: {
                price: state.price,
                planName: state.planName
            }
        });
    }
    // on <div> click, go to PaypalOption page
    // and pass-on selected plan info received from PlanForm.js
    const goToPaypal = () => {
        let path = `/signup/paypaloption`;

        navigate(path, {
            state: {
                price: state.price,
                planName: state.planName
            }
        });
    }
    // on <div> click, go to GiftOption page
    // and pass-on selected plan info received from PlanForm.js
    const goToGift = () => {
        let path = `/signup/giftoption`;

        navigate(path, {
            state: {
                price: state.price,
                planName: state.planName
            }
        });
    }

    // Switch classNames between 'creditFlexCol' & 'creditFlexRow' depending on browser width
    useEffect(() => {
        const updateBrowserWidth = () => {
            setBrowserWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateBrowserWidth);

        return () => {
            window.removeEventListener('resize', updateBrowserWidth);
        }
    });


    return (
        <div className='payment'>
            {/* NAVIGATION */}
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            {/* BODY */}
            <div className='flexColPayment'>
                <div className='mdLockIcon'>
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
                        <div className={browserWidth < 500 ? 'creditFlexCol' : 'creditFlexRow'}>
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
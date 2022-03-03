//// Payment.js - component for /signup/payment (Step 3)

import { useNavigate } from "react-router";

import { MdLockOutline } from 'react-icons/md';
import { IoIosLock } from 'react-icons/io';
import { VscChevronRight } from 'react-icons/vsc';

import visa from '../assets/visa.svg';
import mastercard from '../assets/mastercard.svg';
import amex from '../assets/amex.svg';
import discover from '../assets/discover.png';
import paypal from '../assets/paypal.svg';
import giftcard from '../assets/netflix_giftcard.svg';

const Payment = ({ logo }) => {
    const reroute = useNavigate();

    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on <div> click, move to Credit options page
    const creditPage = () => {
        let path = `/signup/creditoption`;
        reroute(path);
    }

    // on <div> click, move to PayPal option page
    const paypalPage = () => {
        let path = `/signup/paypaloption`;
        reroute(path);
    }

    // on <div> click, move to Gift code option page
    const giftPage = () => {
        let path = `/signup/giftoption`;
        reroute(path);
    }

    // Circle lock styling
    const circleLockStyle = {
        color: "#e50914",
        fontSize: "2.5rem"
    }

    // Key lock styling
    const keyLockStyle = {
        color: "#F9BE08",
        fontSize: "1rem"
    }

    // Chevron right styling
    const chevronRightStyle = {
        color: "lightgrey",
        fontSize: "2rem"
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


    return (
        <div className='payment'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColPayment'>
                <div>
                    <MdLockOutline style={circleLockStyle} />
                </div>
                <div>
                    <p>STEP <b>3</b> OF <b>3</b></p>
                    <h1>Set up your payment</h1>
                </div>
                <div>
                    <h2>Your membership starts as soon as you set up payment.</h2>
                </div>
                <div>
                    <h3>No commitments.</h3>
                    <h3>Cancel online anytime.</h3>
                </div>

                <div>
                    <p className='secureServer'>Secure Server <IoIosLock style={keyLockStyle} /></p>
                    <div onClick={creditPage} className='creditDiv'>
                        <div className='creditFlexCol'>
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
                            <VscChevronRight style={chevronRightStyle} />
                        </div>
                    </div>
                </div>

                <div>
                    <div onClick={paypalPage} className='paypalGiftDiv'>
                        <div className='paypalGiftFlexRow'>
                            <p>PayPal</p>
                            <img src={paypal} alt="PayPal SVG" style={svgStyle} />
                        </div>
                        <div>
                            <VscChevronRight style={chevronRightStyle} />
                        </div>
                    </div>
                </div>

                <div>
                    <div onClick={giftPage} className='paypalGiftDiv'>
                        <div className='paypalGiftFlexRow'>
                            <p>Gift Code</p>
                            <img src={giftcard} alt="Netflix Gift Card SVG" style={svgStyle} />
                        </div>
                        <div>
                            <VscChevronRight style={chevronRightStyle} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
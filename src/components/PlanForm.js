//// PlanForm.js - component for /signup/planform (Step 2 continued)

import { useState } from 'react';
import { useNavigate } from 'react-router';

const PlanForm = ({ logo, checkMarkLg, checkMarkSm }) => {
    // sets the default plan choice to "Premium"
    const [activePlan, setActivePlan] = useState('premo');
    let navigate = useNavigate();

    // on 'Next' btn click, go to Payment page
    const goToPayment = () => {
        let path = `/signup/payment`;
        let price = '';
        let planName = '';

        if (activePlan === 'premo') {
            price = '$19.99/month';
            planName = 'Premium Plan';
        } else if (activePlan === 'std') {
            price = '$15.49/month';
            planName = 'Standard Plan';
        } else {
            price = '$9.99/month';
            planName = 'Basic Plan';
        }

        navigate(path, {
            state: {
                price: price,
                planName: planName
            }
        });
    }

    // row descriptor (e.g. 'Monthly price', etc...) styling
    const rowDescriptorStyle = {
        fontSize: "0.8rem",
        fontWeight: "500",
        alignSelf: "center",
        marginTop: "-10px"
    }

    return (
        <div className='planForm'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColFull'>
                <p>STEP <b>2</b> OF <b>3</b></p>
                <h1>Choose the plan that's right for you</h1>
                <h2>{checkMarkLg} Watch all you want. Ad-free.</h2>
                <h2>{checkMarkLg} Recommendations just for you.</h2>
                <h2>{checkMarkLg} Change or cancel your plan anytime.</h2>

                <div className='flexRowBtns'>
                    <button onClick={() => setActivePlan('basic')} className={activePlan === 'basic' ? 'activeBtn' : 'inactiveBtn'}>Basic</button>
                    <button onClick={() => setActivePlan('std')} className={activePlan === 'std' ? 'activeBtn' : 'inactiveBtn'}>Standard</button>
                    <button onClick={() => setActivePlan('premo')} className={activePlan === 'premo' ? 'activeBtn' : 'inactiveBtn'}>Premium</button>
                </div>

                <p style={rowDescriptorStyle}>Monthly price</p>

                <div className='flexRowPlans'>
                    <p className={activePlan === 'basic' ? 'textRed' : 'textGrey'}>$9.99.</p>
                    <p className={activePlan === 'std' ? 'textRed' : 'textGrey'}>$15.49</p>
                    <p className={activePlan === 'premo' ? 'textRed' : 'textGrey'}>$19.99</p>
                </div>

                <p style={rowDescriptorStyle}>Video quality</p>

                <div className='flexRowPlans'>
                    <p className={activePlan === 'basic' ? 'textRed' : 'textGrey'}>Good</p>
                    <p className={activePlan === 'std' ? 'textRed' : 'textGrey'}>Better</p>
                    <p className={activePlan === 'premo' ? 'textRed' : 'textGrey'}>Best</p>
                </div>

                <p style={rowDescriptorStyle}>Resolution</p>

                <div className='flexRowPlans'>
                    <p className={activePlan === 'basic' ? 'textRed' : 'textGrey'}>480p</p>
                    <p className={activePlan === 'std' ? 'textRed' : 'textGrey'}>1080p</p>
                    <p className={activePlan === 'premo' ? 'textRed' : 'textGrey'}>4K+HDR</p>
                </div>

                <p style={rowDescriptorStyle}>Watch on your TV, computer, mobile phone and tablet</p>

                <div className='flexRowPlans'>
                    <p className={activePlan === 'basic' ? 'textRed' : 'textGrey'}>{checkMarkSm}</p>
                    <p className={activePlan === 'std' ? 'textRed' : 'textGrey'}>{checkMarkSm}</p>
                    <p className={activePlan === 'premo' ? 'textRed' : 'textGrey'}>{checkMarkSm}</p>
                </div>

                <div className='planDetails'>
                    <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
                    to your internet service and device capabilities. Not all content is 
                    available in all resolutions. See our <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a> for more details.</p>
                    <p>Only people who live with you may use your account. Watch on 4 different 
                    devices at the same time with Premium, 2 with Standard and 1 with Basic.</p>
                </div>

                <button onClick={goToPayment} className='nextBtnAlt'>Next</button>
            </div>
        </div>
    )
}

export default PlanForm;
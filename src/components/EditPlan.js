//// EditPlan.js - component for /signup/editplan
// almost a direct copy of PlanForm.js EXCEPT without the 'Step 2 of 3' line

import { useState } from 'react';
import { useNavigate } from 'react-router';

const EditPlan = ({ logo, checkMarkLg, checkMarkSm }) => {
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

    /* Temp styling */
    const flexRow = {
        display: "flex",
        alignItems: "center"
    }

    const redText = {
        color: "#e50914",
        fontWeight: "700"
    }

    const greyText = {
        color: "dimgrey",
        fontWeight: "700"
    }

    return (
        <div className='editPlan'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColFull'>
                <h1>Choose the plan that's right for you</h1>
                <div style={flexRow}>
                    {checkMarkLg}<h2> Watch all you want. Ad-free.</h2>
                </div>
                <div style={flexRow}>
                    {checkMarkLg}<h2> Recommendations just for you.</h2>
                </div>
                <div style={flexRow}>
                    {checkMarkLg}<h2> Change or cancel your plan anytime.</h2>
                </div>

                <div className='flexRowBtns'>
                    <button onClick={() => setActivePlan('basic')} className={activePlan === 'basic' ? 'activeBtn' : 'inactiveBtn'}>Basic</button>
                    <button onClick={() => setActivePlan('std')} className={activePlan === 'std' ? 'activeBtn' : 'inactiveBtn'}>Standard</button>
                    <button onClick={() => setActivePlan('premo')} className={activePlan === 'premo' ? 'activeBtn' : 'inactiveBtn'}>Premium</button>
                </div>

                <div className='planBreakdown'>
                    <h3>Monthly price</h3>
                    <div className='flexRowBreakdown'>
                        <p style={activePlan === 'basic' ? redText : greyText }>$9.99</p>
                        <p style={activePlan === 'std' ? redText : greyText }>$15.49</p>
                        <p style={activePlan === 'premo' ? redText : greyText }>$19.99</p>
                    </div>
                </div>

                <div className='planBreakdown'>
                    <h3>Video quality</h3>
                    <div className='flexRowBreakdown'>
                        <p style={activePlan === 'basic' ? redText : greyText }>Good</p>
                        <p style={activePlan === 'std' ? redText : greyText }>Better</p>
                        <p style={activePlan === 'premo' ? redText : greyText }>Best</p>
                    </div>
                </div>

                <div className='planBreakdown'>
                    <h3>Resolution</h3>
                    <div className='flexRowBreakdown'>
                        <p style={activePlan === 'basic' ? redText : greyText }>480p</p>
                        <p style={activePlan === 'std' ? redText : greyText }>1080p</p>
                        <p style={activePlan === 'premo' ? redText : greyText}>4K+HDR</p>
                    </div>
                </div>

                <div className='planBreakdown' style={{ borderBottom: 'none' }}>
                    <h3>Watch on your TV, computer, mobile phone and tablet</h3>
                    <div className='flexRowBreakdown'>
                        <p style={activePlan === 'basic' ? redText : greyText }>{checkMarkSm}</p>
                        <p style={activePlan === 'std' ? redText : greyText }>{checkMarkSm}</p>
                        <p style={activePlan === 'premo' ? redText : greyText }>{checkMarkSm}</p>
                    </div>
                </div>

                <div className='planDetails'>
                    <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
                    to your internet service and device capabilities. Not all content is 
                    available in all resolutions. See our <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a> for more details.</p>
                    <p>Only people who live with you may use your account. Watch on 4 different 
                    devices at the same time with Premium, 2 with Standard and 1 with Basic.</p>
                </div>

                <button onClick={goToPayment} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default EditPlan;
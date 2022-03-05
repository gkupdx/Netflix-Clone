//// PlanForm.js - component for /signup/planform (Step 2 continued)

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { IoCheckmarkOutline } from "react-icons/io5";

const PlanForm = ({ logo }) => {
    const [activePlan, setActivePlan] = useState('premo');

    let reroute = useNavigate();

    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on button click, move to Step 3 of registration
    const stepThree = () => {
        let path = `/signup/payment`;
        reroute(path);
    }

    // large check marks styling
    const lgCheckMarkStyle = {
        color: "#e50914",
        fontSize: "2rem"
    }

    // small check marks styling 
    const smCheckMarkStyle = {
        fontSize: "2rem"
    }

    // row descriptor (e.g. 'Monthly price', etc...) styling
    const rowDescriptorStyle = {
        fontSize: "0.8rem",
        alignSelf: "center"
    }

    // on click, highlight the selected plan
    const highlightActiveBtn = (name) => {
        setActivePlan(name)
    }

    return (
        <div className='planForm'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColFull'>
                <p>STEP <b>2</b> OF <b>3</b></p>
                <h1>Choose the plan that's right for you</h1>
                <h2><IoCheckmarkOutline style={lgCheckMarkStyle} /> Watch all you want. Ad-free.</h2>
                <h2><IoCheckmarkOutline style={lgCheckMarkStyle} /> Recommendations just for you.</h2>
                <h2><IoCheckmarkOutline style={lgCheckMarkStyle} /> Change or cancel your plan anytime.</h2>

                <div className='flexRowBtns'>
                    <button onClick={() => highlightActiveBtn('basic')} className={activePlan === 'basic' ? 'activeBtn' : 'inactiveBtn'}>Basic</button>
                    <button onClick={() => highlightActiveBtn('std')} className={activePlan === 'std' ? 'activeBtn' : 'inactiveBtn'}>Standard</button>
                    <button onClick={() => highlightActiveBtn('premo')} className={activePlan === 'premo' ? 'activeBtn' : 'inactiveBtn'}>Premium</button>
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
                    <p className={activePlan === 'basic' ? 'textRed' : 'textGrey'}><IoCheckmarkOutline style={smCheckMarkStyle}/></p>
                    <p className={activePlan === 'std' ? 'textRed' : 'textGrey'}><IoCheckmarkOutline style={smCheckMarkStyle}/></p>
                    <p className={activePlan === 'premo' ? 'textRed' : 'textGrey'}><IoCheckmarkOutline style={smCheckMarkStyle}/></p>
                </div>

                <div>
                    <p className='planDetails'>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
                    to your internet service and device capabilities. Not all content is 
                    available in all resolutions. See our <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a> for more details.</p>
                    <p className='planDetails'>Only people who live with you may use your account. Watch on 4 different 
                    devices at the same time with Premium, 2 with Standard and 1 with Basic.</p>
                </div>

                <button onClick={stepThree} className='nextBtnAlt'>Next</button>
            </div>
        </div>
    )
}

export default PlanForm;
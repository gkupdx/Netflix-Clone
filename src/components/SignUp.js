//// SignUp.js - component for the /signup page (Step 2)

import { useNavigate } from 'react-router';

import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoCheckmarkOutline } from 'react-icons/io5';


const SignUp = ({ logo }) => {
    let reroute = useNavigate();

    // on logo click, redirect to landing page
    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on button click, move to Step 2 (continued) of registration
    const stepTwoCont = () => {
        let path = `/signup/planform`;
        reroute(path);
    }

    // Check mark circle styling
    const checkMarkCircleStyle = {
        color: "#e50914",
        fontSize: "3.5rem"
    }

    // Check marks styling
    const checkMarkStyle = {
        color: "#e50914",
        fontSize: "2rem"
    }

    // Stand-in flex row 
    const flexRow = {
        display: "flex"
    }


    return (
        <div className='plans'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColPlans'>
                <div>
                    <IoIosCheckmarkCircleOutline style={checkMarkCircleStyle} />
                </div>
                <div>
                    <p>STEP <b>2</b> OF <b>3</b></p>
                    <h1>Choose your plan.</h1>
                </div>
                <div>
                    <div style={flexRow}>
                        <IoCheckmarkOutline style={checkMarkStyle} /><h2> No commitments, cancel anytime.</h2>
                    </div>
                </div>
                <div>
                    <div style={flexRow}>
                        <IoCheckmarkOutline style={checkMarkStyle} /><h2> Everything on Netflix for one low price.</h2>
                    </div>
                </div>
                <div>
                    <div style={flexRow}>
                        <IoCheckmarkOutline style={checkMarkStyle} /><h2> Unlimited viewing on all your devices.</h2>
                    </div>
                </div>
                <div>
                    <button onClick={stepTwoCont} className='nextBtn'>Next</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
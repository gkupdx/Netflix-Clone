//// Registration.js - component for the /signup/registration page

import { useNavigate, useLocation } from "react-router";

const Registration = ({ logo }) => {
    let { state } = useLocation(); // destructure for direct use
    let reroute = useNavigate();

    // on logo click, redirect to landing page
    const redirect = () => {
        let path = `/`
        reroute(path);
    }

    // on button click, move to Step 1 of registration
    const stepOne = () => {
        let path = `/signup/regform`
        let input = state.email;

        reroute(path, {
            state: {
                email: input
            }
        });
    }

    return (
        <div className='registration'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect}/>
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexCol'>
                <img src='https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png' alt='Devices'/>
                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Finish setting up your account</h1>
                <h3>Netflix is personalized for you.</h3>
                <h3>Create a password to watch on any device at any time.</h3>
                <button onClick={stepOne} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default Registration;
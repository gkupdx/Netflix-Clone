//// SignUp.js - component for the /signup page (Step 2)

import { useNavigate } from 'react-router';

const SignUp = ({ logo, checkMarkCircle, checkMark }) => {
    let navigate = useNavigate();

    // Inline flex row (temporary fix) 
    const flexRow = {
        display: "flex"
    }


    return (
        <div className='plans'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={() => navigate('/')} />
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColPlans'>
                <div>
                    {checkMarkCircle}
                </div>
                <div>
                    <p>STEP <b>2</b> OF <b>3</b></p>
                    <h1>Choose your plan.</h1>
                </div>
                <div>
                    <div style={flexRow}>
                        {checkMark}<h2> No commitments, cancel anytime.</h2>
                    </div>
                </div>
                <div>
                    <div style={flexRow}>
                        {checkMark}<h2> Everything on Netflix for one low price.</h2>
                    </div>
                </div>
                <div>
                    <div style={flexRow}>
                        {checkMark}<h2> Unlimited viewing on all your devices.</h2>
                    </div>
                </div>
                <div>
                    <button onClick={() => navigate('/signup/planform')} className='nextBtn'>Next</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
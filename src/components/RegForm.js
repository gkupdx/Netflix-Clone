//// RegForm.js - component for the /signup/regform page (Step 1)

import { useNavigate } from "react-router";

const RegForm = ({ logo }) => {
    let reroute = useNavigate();

    // on logo click, redirect to landing page
    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    // on button click, move to Step 2 of registration
    const stepTwo = () => {
        let path =`/signup`;
        reroute(path);
    }

    return (
        <div className='regForm'>
            <div className='flexRowFull'>
                <img src={logo} alt='Netflix logo white' onClick={redirect}/>
                <a href='/login'>Sign In</a>
            </div>

            <div className='flexColForm'>
                <p>STEP <b>1</b> OF <b>3</b></p>
                <h1>Create a password to start your membership</h1>
                <h3>Just a few more steps and you're done!</h3>
                <h3>We hate paperwork, too.</h3>
                <input type="text" name="email" placeholder="Email"/>
                <input type="text" name="password" placeholder="Add a password"/>
                <button onClick={stepTwo} className='nextBtn'>Next</button>
            </div>
        </div>
    )
}

export default RegForm;
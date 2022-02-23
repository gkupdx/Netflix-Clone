//// Login.js - component for the login page

import { useNavigate } from 'react-router';

import textLogo from '../assets/netflix_text_logo.png';

const Login = ({ fbIcon }) => {
    // assign useNavigate() to variable for use
    let reroute = useNavigate();

    // on Netflix logo click, redirect to landing page
    const redirect = () => {
        let path = `/`;
        reroute(path);
    }

    return (
        <div className='login'>
            <button className='redirectBtn' onClick={redirect}><img src={textLogo} alt='Netflix text logo' /></button>

            <div className='formDiv'>
                <h1>Sign In</h1>
                <form action="POST">
                    <div className='form'>
                        <input type="text" name="user" placeholder="Email or phone number"/>
                        <input type="text" name="password" placeholder="Password"/>
                        <a href='/browse'><input type="submit" value="Sign In"/></a>
                        <div className='rowJustifyBetween'>
                            <div>
                                <input type="checkbox" id="checkbox" />
                                <label htmlFor="checkbox"> Remember me</label>
                            </div>

                            <button className='helpBtn'>Need help?</button>
                        </div>
                    </div>

                    <div className='formHelp'>
                        <button className='fbBtn'>{fbIcon} Login with Facebook</button>
                        <p className='signUp'>New to Netflix? <a href='/'>Sign up now</a>.</p>
                        <p className='captcha'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='learnMore'>Learn more.</span></p>
                    </div>
                </form>
            </div>

            {/* <div className='formBackground'></div> */}
        </div>
    )
}

export default Login;


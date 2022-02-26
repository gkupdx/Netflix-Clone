//// Banner.js - component for Netflix hero image banner

import { useNavigate } from 'react-router';

import { VscChevronRight } from 'react-icons/vsc';

const Banner = () => {
    let reroute = useNavigate();

    // On click, send the user to the Sign Up/Registration page
    const redirect = () => {
        let path = `/signup/registration`;
        reroute(path);
    }

    return (
        <div className='main'>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership</p>

            <input type="text" name="email" placeholder="Email address" />
            <button onClick={redirect}>Get Started <VscChevronRight /></button>
        </div>
    )
}

export default Banner;
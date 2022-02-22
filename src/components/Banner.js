//// Banner.js - component for Netflix hero image banner

import { VscChevronRight } from 'react-icons/vsc';

const Banner = () => {
    return (
        <div className='main'>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership</p>

            <input type="text" name="email" placeholder="Email address" />
            <button>Get Started <VscChevronRight /></button>
        </div>
    )
}

export default Banner;
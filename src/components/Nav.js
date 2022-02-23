//// Nav.js - component for navbar

import logo from '../assets/netflix_text_logo.png';

const Nav = ({ toggleLanguages, toggle, globeIcon, caretIcon }) => {

    return (
        <nav className='nav'>
            <a href='/'><img src={logo} alt="Netflix text logo" /></a>

            <ul>
                <li>
                    <button className='languageBtn' onClick={toggleLanguages}>{globeIcon} English {caretIcon}</button>
                    {toggle ? <div className='languageDropDown'><p>English</p><p>Espanol</p></div> : ''}
                    <a href='/login' className='signIn'>Sign In</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
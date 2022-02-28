//// FooterAlt.js - component for alternate footer placed at bottom of Sign In page

const FooterAlt = ({ toggleLanguages, toggle, globeIcon, caretIcon, theme }) => {

    return (
        <footer className={theme === 'dark' ? 'footerAlt' : 'footerAltLight'}>
            <div className='footerWrapper'>
                <p>Questions? Call <a href='tel:1-844-505-2993'>1-844-505-2993</a></p>


                <div className='linksWrapperAlt'>
                    <a href='#faq'>FAQ</a>
                    <a href='#help'>Help Center</a>
                    <a href='#tos'>Terms of Use</a>
                    <a href='#privacy'>Privacy</a>
                    <a href='#cookies'>Cookie Preferences</a>
                    <a href='#ci'>Corporate Information</a>
                </div>

                <div>
                    {toggle ? <div className='languagePopUpAlt'><p>English</p><p>Espanol</p></div> : ''}
                    <button onClick={toggleLanguages}>{globeIcon} English {caretIcon}</button>
                </div>
            </div>
        </footer>
    )
}

export default FooterAlt;
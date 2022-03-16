//// FAQ.js - component for the Frequently Asked Questions subsection

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from 'react-icons/ai';
import { VscChevronRight } from "react-icons/vsc";

const FAQ = () => {
    const [show, setShow] = useState("");
    const [emailVal, setEmailVal] = useState('');
    const emailRef = useRef();

    let reroute = useNavigate();

    // on click, reroute user to /signup/registration
    const redirect = () => {
        let fieldVal = emailRef.current.value;

        if (fieldVal.length === 0) {
            emailRef.current.focus();
            fieldVal = 'empty'
        } else {
            fieldVal = 'nonEmpty'
        }

        setEmailVal(fieldVal);
    }

    useEffect(() => {
        if (emailVal === 'nonEmpty') {
            let path = `/signup/registration`;
            reroute(path);
        }
    }, [emailVal, reroute])

    
    // Toggle for FAQ buttons
    const toggleFAQBtn = (input) => {
        // if given input value is equal to current state, set input to empty string
        if (show === input) {
            input = "";
        }

        setShow(input);
    }

    // Plus icon styling
    const aiOutlineIconStyle = {
        fontSize: "25px"
    }

    return (
        <div className='faq'>
            <div className={show === "" ? 'faqWrapper' : 'faqWrapperMb'}>
                <h1>Frequently Asked Questions</h1>
                <button className='faqBtn' onClick={() => toggleFAQBtn("what")}>What is Netflix? {show === 'what' ? <AiOutlineClose style={aiOutlineIconStyle} /> : <AiOutlinePlus style={aiOutlineIconStyle} />}</button>
                {show === 'what' ?
                    <div className='faqBtnDetails'>
                        <p>Netflix is a streaming service that offers a wide variety
                            of award-winning TV shows, movies, anime, documentaries,
                            and more on thousands of internet-connected devices.</p>
                        <p>You can watch as much as you want, whenever you want
                            without a single commercial - all for one low monthly price.
                            There's always something new to discover and new TV shows
                            and movies are added every week!</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("cost")}>How much does Netflix cost? {show === 'cost' ? <AiOutlineClose style={aiOutlineIconStyle} /> : <AiOutlinePlus style={aiOutlineIconStyle} />}</button>
                {show === 'cost' ?
                    <div className='faqBtnDetails'>
                        <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop,
                            or streaming device, all for one fixed monthly fee. Plans
                            range from $9.99 to $19.99 a month. No extra costs, no
                            contracts.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("where")}>Where can I watch? {show === 'where' ? <AiOutlineClose style={aiOutlineIconStyle} /> : <AiOutlinePlus style={aiOutlineIconStyle} />}</button>
                {show === 'where' ?
                    <div className='faqBtnDetails'>
                        <p>Watch anywhere, anytime. Sign in with your Netflix
                            account to watch instantly on the web at netflix.com from
                            your personal computer or on any internet-connected device
                            that offers the Netflix app, including smart TVs, smartphones,
                            tablets, streaming media players and game consoles.</p>
                        <p>You can also download your favorite shows with the iOS, Android,
                            or Windows 10 app. Use downloads to watch while you're on the
                            go and without an internet connection. Take Netflix with you
                            anywhere.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("cancel")}>How do I cancel? {show === 'cancel' ? <AiOutlineClose style={aiOutlineIconStyle} /> : <AiOutlinePlus style={aiOutlineIconStyle} />}</button>
                {show === 'cancel' ?
                    <div className='faqBtnDetails'>
                        <p>Netflix is flexible. There are no pesky contracts and no
                            commitments. You can easily cancel your account online in
                            two clicks. There are no cancellation fees - start or stop
                            your account anytime.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("watch")}>What can I watch on Netflix? {show === 'watch' ? <AiOutlineClose style={aiOutlineIconStyle} /> : <AiOutlinePlus style={aiOutlineIconStyle} />}</button>
                {show === 'watch' ?
                    <div className='faqBtnDetails'>
                        <p>Netflix has an extensive library of feature films, documentaries,
                            TV shows, anime, award-winning Netflix originals, and more. Watch
                            as much as you want, anytime you want.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("kids")}>Is Netflix good for kids? {show === 'kids' ? <AiOutlineClose style={aiOutlineIconStyle} /> : <AiOutlinePlus style={aiOutlineIconStyle} />}</button>
                {show === 'kids' ?
                    <div className='faqBtnDetails'>
                        <p>The Netflix Kids experience is included in your membership to give
                            parents control while kids enjoy family-friendly TV shows and movies
                            in their own space.</p>
                        <p>Kids profiles come with PIN-protected parental controls that let
                            you restrict the maturity rating of content kids can watch and block
                            specific titles you don't want the kids to see.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <div>
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <input ref={emailRef} type="text" name="email" placeholder="Email address" style={{ borderBottom: emailVal === 'empty' ? '2px solid orange' : 'none' }}/>
                    {emailVal === 'empty' && <p style={{ color: 'orange' }}>Email is required!</p>}

                    <button className='getStartedBtn' onClick={redirect}>Get Started <VscChevronRight /></button>
                </div>
            </div>
        </div>
    )
}

export default FAQ;
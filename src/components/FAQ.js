//// FAQ.js - component for the Frequently Asked Questions subsection

import { useState, useEffect, useRef, useReducer } from 'react';
import { useNavigate } from 'react-router';

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from 'react-icons/ai';

const FAQ = ({ chevronIcon }) => {
    const [show, setShow] = useState("");
    let navigate = useNavigate();
    const emailRef = useRef();

    const initialState = {
        emailVal: ''
    }

    const reducer = (state, action) => {
        switch (action.type) {
            // 'Empty' = show initial error message + give input field orange border bottom
            case 'Empty':
                return { emailVal: 'empty' }
            case 'Invalid':
                return { emailVal: 'invalid' }
            case 'Valid':
                return { emailVal: 'valid' }
            // 'Valid Click' = email passed validation AND 'Get Started' button was clicked
            case 'Valid Click': 
                return { emailVal : 'valid click' }
            default: 
                return state;
        }
    }

    const [emailState, dispatch] = useReducer(reducer, initialState);

    // On Button click, navigate user to /signup/registration if validation passed
    const goToRegistration = () => {
        let fieldVal = emailRef.current.value;
        let len = fieldVal.length;

        // if either 0 or 1 character, ON BUTTON CLICK, need to apply FOCUS
        if (len === 0 || len === 1) {
            emailRef.current.focus();
            dispatch({
                type: 'Empty'
            });
        } else if (len > 1 && len < 5) { // 2-4 characters, DON'T FOCUS
            dispatch({
                type: 'Empty'
            });
        } else if (len >= 5) { // VALIDATE
            let flag = false; // flag is set on meeting validation requirements

            // loop through input
            for (let i = 0; i < len; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // a '.' is RIGHT AFTER the '@' index (invalid so break loop)
                    if (fieldVal.charAt(atSignIndex+1) === '.') { 
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex+1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, len);
                            if (dotComString.includes('.com')) {
                                flag = true;
                                break;
                            }
                        }
                        
                    }
                }
            }


            if (flag === false) {
                dispatch({
                    type: 'Invalid'
                });
            } else { // else, given email is valid
                dispatch({
                    type: 'Valid Click'
                });
            }
        }
    }

    useEffect(() => {
        if (emailState.emailVal === 'valid click') {
            let path = `/signup/registration`;

            navigate(path, {
                state: {
                    email: emailRef.current.value
                }
            });
        }
    }, [emailState.emailVal, navigate]);

    
    // OnBlur handler
    const handleOnBlur = (event) => {
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        // if less than 5 characters, displays 'Email is required!'
        if (len < 5) {
            dispatch({
                type: 'Empty'
            });
        } else if (len >= 5) {
            let flag = false; // flag is set on meeting validation requirements

            // loop through input
            for (let i = 0; i < len; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // '.' character is RIGHT AFTER the '@' index (i.e. invalid so break loop)
                    if (fieldVal.charAt(atSignIndex+1) === '.') { 
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex+1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, len);
                            if (dotComString.includes('.com')) {
                                flag = true;
                                break;
                            }
                        }
                        
                    }
                }
            }


            if (flag === false) {
                dispatch({
                    type: 'Invalid'
                });
            } else { // else, given email is valid
                dispatch({
                    type: 'Valid'
                });
            }
        }
    }

    // OnChange handler (only triggers if state is NOT in default state)'
    const handleOnChange = (event) => {
        let fieldVal = event.target.value;
        let len = fieldVal.length;

        if (len < 5 && emailState.emailVal !== '') {
            dispatch({
                type: 'Empty'
            });
        } else if (len >= 5 && emailState.emailVal !== '') { // VALIDATE
            let flag = false;

            // loop through input
            for (let i = 0; i < len; ++i) {
                if (fieldVal.charAt(i) === '@') { // '@' character was found so check for '.com'
                    let atSignIndex = i;

                    // '.' character is RIGHT AFTER the '@' index (i.e. invalid so break loop)
                    if (fieldVal.charAt(atSignIndex+1) === '.') { 
                        break;
                    } else {
                        // test to see if character RIGHT after the '@' is alphabet
                        let alphaRegex = /^[a-zA-Z]+$/.test(fieldVal.charAt(atSignIndex+1));

                        // if true, check to see if substring after the '@' includes '.com'
                        if (alphaRegex) {
                            let dotComString = fieldVal.substring(atSignIndex, len);
                            if (dotComString.includes('.com')) {
                                flag = true;
                                break;
                            }
                        }
                        
                    }
                }
            }

            if (flag === false) {
                dispatch({
                    type: 'Invalid'
                });
            } else { // else, given email is valid
                dispatch({
                    type: 'Valid'
                });
            }
        } 
    }

    // Toggle for FAQ buttons
    const toggleFAQBtn = (input) => {
        // if given input value is equal to current state, set input to empty string
        if (show === input) {
            input = "";
        }
        setShow(input);
    }

    return (
        <div className='faq'>
            <div className={show === "" ? 'faqWrapper' : 'faqWrapperMb'}>
                <h1>Frequently Asked Questions</h1>
                <button className='faqBtn' onClick={() => toggleFAQBtn("what")}>What is Netflix? {show === 'what' ? <AiOutlineClose style={{ fontSize: "25px" }} /> : <AiOutlinePlus style={{ fontSize: "25px" }} />}</button>
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

                <button className='faqBtn' onClick={() => toggleFAQBtn("cost")}>How much does Netflix cost? {show === 'cost' ? <AiOutlineClose style={{ fontSize: "25px" }} /> : <AiOutlinePlus style={{ fontSize: "25px" }} />}</button>
                {show === 'cost' ?
                    <div className='faqBtnDetails'>
                        <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop,
                            or streaming device, all for one fixed monthly fee. Plans
                            range from $9.99 to $19.99 a month. No extra costs, no
                            contracts.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("where")}>Where can I watch? {show === 'where' ? <AiOutlineClose style={{ fontSize: "25px" }} /> : <AiOutlinePlus style={{ fontSize: "25px" }} />}</button>
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

                <button className='faqBtn' onClick={() => toggleFAQBtn("cancel")}>How do I cancel? {show === 'cancel' ? <AiOutlineClose style={{ fontSize: "25px" }} /> : <AiOutlinePlus style={{ fontSize: "25px" }} />}</button>
                {show === 'cancel' ?
                    <div className='faqBtnDetails'>
                        <p>Netflix is flexible. There are no pesky contracts and no
                            commitments. You can easily cancel your account online in
                            two clicks. There are no cancellation fees - start or stop
                            your account anytime.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("watch")}>What can I watch on Netflix? {show === 'watch' ? <AiOutlineClose style={{ fontSize: "25px" }} /> : <AiOutlinePlus style={{ fontSize: "25px" }} />}</button>
                {show === 'watch' ?
                    <div className='faqBtnDetails'>
                        <p>Netflix has an extensive library of feature films, documentaries,
                            TV shows, anime, award-winning Netflix originals, and more. Watch
                            as much as you want, anytime you want.</p>
                    </div>
                    : <div className='hiddenDetails'></div>}

                <button className='faqBtn' onClick={() => toggleFAQBtn("kids")}>Is Netflix good for kids? {show === 'kids' ? <AiOutlineClose style={{ fontSize: "25px" }} /> : <AiOutlinePlus style={{ fontSize: "25px" }} />}</button>
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
                    <input ref={emailRef} type="text" name="email" placeholder="Email address" style={{ borderBottom: (emailState.emailVal === 'empty' || emailState.emailVal === 'invalid') && '2px solid orange', borderColor: emailState.emailVal === 'valid' ? 'green' : 'none' }} onBlur={(event) => handleOnBlur(event)} onChange={(event) => handleOnChange(event)}/>
                    {emailState.emailVal === 'empty' && <p style={{ color: 'orange', fontSize: '0.9rem' }}>Email is required!</p>}
                    {emailState.emailVal === 'invalid' && <p style={{ color: 'orange', fontSize: '0.9rem' }}>Please enter a valid email address</p>}

                    <button className='getStartedBtn' onClick={goToRegistration}>Get Started {chevronIcon}</button>
                </div>
            </div>
        </div>
    )
}

export default FAQ;
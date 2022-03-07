//// Homepage.js - container component to house all components relevant to the homepage
//// shared code logic will be stored here

import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';

import Nav from './Nav';
import Banner from './Banner';
import Subsection from './Subsection';
import FAQ from './FAQ';
import Footer from './Footer';

import tv from '../assets/tv.png';
import mobile from '../assets/mobile.png';
import devicePile from '../assets/device_pile.png';
import kidsProfile from '../assets/kids_profile.png';


const Homepage = ({ toggleLanguages, toggle }) => {
    // Variables to determine subsection ordering
    // (for styling reasons)
    let odd = 1;
    let even = 2;

    // Temporary array of subsection headers + body 
    const subsectionContent = [
        {
            header: 'Enjoy on your TV.',
            body: 'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.'
        },
        {
            header: 'Download your shows to watch offline.',
            body: 'Save your favorites easily and always have something to watch.'
        },
        {
            header: 'Watch everywhere.',
            body: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.'
        },
        {
            header: 'Create profiles for kids.',
            body: 'Send kids on adventures with their favorite characters in a space made just for them--free with your membership.'
        }
    ];

    // Globe icon styling
    const globeIconStyle = {
        color: "#FFF"
    }

    return (
        <div>
            <Nav toggleLanguages={toggleLanguages} toggle={toggle} globeIcon={<IoGlobe style={globeIconStyle}/>} caretIcon={<AiFillCaretDown />} />
            <Banner />
            <Subsection header={subsectionContent[0].header} body={subsectionContent[0].body} imgSrc={tv} order={odd}/>
            <Subsection header={subsectionContent[1].header} body={subsectionContent[1].body} imgSrc={mobile} order={even}/>
            <Subsection header={subsectionContent[2].header} body={subsectionContent[2].body} imgSrc={devicePile} order={odd}/>
            <Subsection header={subsectionContent[3].header} body={subsectionContent[3].body} imgSrc={kidsProfile} order={even}/>
            <FAQ />
            <Footer />
        </div>
    )
}

export default Homepage;
//// Homepage.js - container component to house all components relevant to the homepage
//// shared code logic will be stored here

import { IoGlobe } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';

import Nav from './Nav';
import Banner from './Banner';
import Subsection from './Subsection';
import FAQ from './FAQ';
import Footer from './Footer';


const Homepage = ({ toggleLanguages, toggle }) => {
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
            <Subsection header={subsectionContent[0].header} body={subsectionContent[0].body} />
            <Subsection header={subsectionContent[1].header} body={subsectionContent[1].body} />
            <Subsection header={subsectionContent[2].header} body={subsectionContent[2].body} />
            <Subsection header={subsectionContent[3].header} body={subsectionContent[3].body} />
            <FAQ />
            <Footer />
        </div>
    )
}

export default Homepage;
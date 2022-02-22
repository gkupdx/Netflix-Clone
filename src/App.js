//// App.js

import Nav from './components/Nav';
import Banner from './components/Banner';
import Subsection from './components/Subsection';
import Footer from './components/Footer';

// Routes from React Router
import { Routes, Route } from 'react-router-dom';

function App() {
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

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={
          <>
            <Nav />
            <Banner />
            <Subsection header={subsectionContent[0].header} body={subsectionContent[0].body} />
            <Subsection header={subsectionContent[1].header} body={subsectionContent[1].body} />
            <Subsection header={subsectionContent[2].header} body={subsectionContent[2].body} />
            <Subsection header={subsectionContent[3].header} body={subsectionContent[3].body} />
            <Footer />
          </>
          } />
      </Routes>
    </div>
  );
}

export default App;

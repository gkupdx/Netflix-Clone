//// App.js

import Nav from './components/Nav';
import Banner from './components/Banner';

// Routes from React Router
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={
          <>
            <Nav />
            <Banner />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;

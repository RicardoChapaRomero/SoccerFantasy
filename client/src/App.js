// client/src/App.js

import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './components/start/StartPage';
import Team from './components/team/Team';
import Stats from './components/stats/Stats';
import Social from './components/social/Social';
import About from './components/about/About';

import { verifyUserToken, verifyUser } from './scripts/apiScripts';

function App() {
  const pages = ['team', 'social', 'stats', 'about'];
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    // Authenticate the user if their session token is still valid
    const verifyToken = async () => {
      const token_res = await verifyUserToken(document.cookie);
      if (token_res.userId) {
        const user_res = await verifyUser(token_res.userId);
        setIsAuth(user_res.userIsRegistered);
      } else {
        setIsAuth(false);
      }
    };

    verifyToken();
  }, []);

  if (!isAuth) {
    return <StartPage onAuthChange={(isAuth) => setIsAuth(isAuth)} />;
  }
  return (
    <div>
      <Navbar
        pages={pages}
        onAuthChange={(isAuth) => setIsAuth(isAuth)}
      >
        {' '}
      </Navbar>
      <Routes>
        <Route path="/" element={<Team />} />
        <Route path="/social" element={<Social />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

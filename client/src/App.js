// client/src/App.js

import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import StartPage from './components/start/StartPage';
import Team from './components/team/Team';
<<<<<<< HEAD
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
  
=======
import Stats from './components/stats/Stats';

function App() {
  const pages = ['team', 'social', 'stats', 'about'];
  const [isAuth, setIsAuth] = useState(true);
>>>>>>> becfa14e56e482ef7c04efe4b1f15903cb69922d
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
        <Route path="/" element={<h1> home</h1>} />
        <Route path="/team" element={<Team />} />
        <Route path="/social" element={<h1> social</h1>} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<h1> about</h1>} />
      </Routes>
    </div>
  );
}

export default App;

// client/src/App.js

import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import StartPage from './components/start/StartPage';
import Field from './components/team/Field';

function App() {
  const pages = ['team', 'social', 'stats', 'about'];
  const [isAuth, setIsAuth] = useState(false);
  if (!isAuth) {
    return <StartPage 
      onAuthChange={(isAuth) => setIsAuth(isAuth)}
      />;
  }
  return (
    <div>
      <Navbar pages={pages} onAuthChange={(isAuth) => setIsAuth(isAuth)}> </Navbar>
      <Routes>
        <Route path="/" element={<h1> home</h1>} />
        <Route path="/team" element={<Field />} />
        <Route path="/social" element={<h1> social</h1>} />
        <Route path="/stats" element={<h1> stats</h1>} />
        <Route path="/about" element={<h1> about</h1>} />
      </Routes>
    </div>
  );
}

export default App;

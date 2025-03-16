import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo"><img src="bg.png" alt="Logo" className="logo" /></div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/">About Us</a>
        <a href="/">How It Works</a>
        <div className="button-container">
                <button className="Login" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>
    </header> 
  ); 
}

export default Header;
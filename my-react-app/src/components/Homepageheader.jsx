import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <img src="HDDD.png" alt="Logo" className="logo" />
      <nav className="nav">
      <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
      Home
    </a>

        <a onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} style={{ cursor: 'pointer' }}>
          About Us
        </a>
        <a onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} style={{ cursor: 'pointer' }}>
          How It Works
        </a>
        <a onClick={(e) => { e.preventDefault(); scrollToSection('stories'); }} style={{ cursor: 'pointer' }}>
        Voices of Change
        </a>
        <a onClick={(e) => { e.preventDefault(); scrollToSection('causes'); }} style={{ cursor: 'pointer' }}>
          Causes
        </a>
        <button onClick={handleLogout} className="logout-btn">
              Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;

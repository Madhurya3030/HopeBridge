import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo">
      <img src="HDDD.png" alt="Logo" className="logo" />
      </div>
      <nav className="nav"> 
        <div className="button-container">
              <button className="Login" onClick={() => navigate('/registration1')}>Registration</button>
        </div>
      </nav>
    </header> 
  );
}

export default Header;
import React from 'react';
import { useNavigate } from "react-router-dom";
import './Causes.css';

function Causes() {
  const navigate = useNavigate(); 

  const handledonate = () => {
    navigate("/donate");
  };

  return (
    <section className="causes" id="causes">
      <h2>SUPPORT A CAUSE</h2>
      <div className="cause-cards">

        <div className="cause-card">
          <img src="educate.jpg" alt="Educate a Child" />
          <h3>Educate a Child</h3>
          <p>Help children get access to quality education.</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: '50%' }}></div>
          </div>
          <p>₹50,000 raised out of ₹1,00,000</p>
          <button className="donate-button" onClick={handledonate}>Donate Now</button>

        </div>
        
        <div className="cause-card">
          <img src="cancer.png" alt="Cancer Care" />
          <h3>Cancer Care</h3>
          <p>Help children from get cure from cancer.</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: '60%' }}></div>
          </div>
          <p>₹50,000 raised out of ₹1,00,000</p>
          <button className="donate-button" onClick={handledonate}>Donate Now</button>
        </div>

        <div className="cause-card">
          <img src="differnetly.jpg" alt="Differently Abled" />
          <h3>Differently Abled</h3>
          <p>Help students for getting training.</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: '40%' }}></div>
          </div>
          <p>₹50,000 raised out of ₹1,00,000</p>
          <button className="donate-button" onClick={handledonate}>Donate Now</button>
        </div>

      </div>
    </section>
  );
}

export default Causes;
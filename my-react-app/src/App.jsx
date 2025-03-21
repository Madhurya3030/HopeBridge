import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Features from './components/Features';
import Causes from './components/Causes';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import RegisterStep1 from "./components/RegisterStep1";
import Home from "./components/Home";
import Reportcase from "./components/Reportcase.jsx";
import Login from "./components/Login.jsx";
import Aboutus from "./components/aboutus.jsx";
import Stories from "./components/stories.jsx";
import Partner from "./components/Partner.jsx";
import Admin from "./components/Adminpage.jsx";
import Chatbot from "./components/Chatbot";
import Donate from "./components/donate.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header />
              <Carousel />
              <Aboutus />
              <Features />
              <Stories />
              <Causes />
              <Partner />
              <Footer />

            </>
          } 
        />

        <Route path="/registration1" element={<RegisterStep1 />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Reportcase />}/>
        <Route path="/admin@tpg" element={<Admin />}/>
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      <Chatbot />
    </Router>
    
  );
}

export default App;
 
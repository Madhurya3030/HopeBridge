import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar1";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => { 
    e.preventDefault();

    if (validate()) {
      if (formData.username === "admin@tpg" && formData.password === "admin") {
        alert(" Admin Login successful!");
        navigate("/admin@tpg");
        return;
      }
      const API_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.post(`${API_URL}/login`, {
          username: formData.username,
          password: formData.password,
        });

        alert(" Login successful!");
        console.log("Login Response:", response.data);
        navigate("/report");
      } catch (error) {
        console.error(" Login failed:", error.response?.data || error.message);
        alert("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div class = "loginform">
      <Navbar />
      <div className="login-container">
        <h2>LOGIN</h2>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter the Username"
              onChange={handleChange}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter the Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>   
      </div>
    </div>
  );
}

export default Login;

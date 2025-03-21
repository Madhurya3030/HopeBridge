import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // For toggling the chatbot window
  const navigate = useNavigate();



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      try {
        const response = await axios.post("http://localhost:4000/chat", {
          prompt: userInput,
        });
        const botResponse = response.data.response;

        if (botResponse.action === "navigate") {
          navigate(botResponse.page);
          setIsOpen(false); 
        } else {
          setChatHistory((prev) => [
            ...prev,
            { user: userInput, bot: botResponse },
          ]);
        }

        setUserInput("");
      } catch (err) {
        console.error("Chatbot request failed:", err.response?.data || err.message);
      }
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : "💬"}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-message">
                <p>
                  <strong className="user">You:</strong> {chat.user}
                </p>
                <p>
                  <strong className="bot">Bot:</strong> {chat.bot}
                </p>
              </div> 
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something..."
              className="chat-input"
            />
            <button type="submit" className="chat-button">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

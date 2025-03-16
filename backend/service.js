const axios = require("axios");

require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const predefinedResponses = {
  login: { action: "navigate", page: "/login" },
  register: { action: "navigate", page: "/registration1" },
  home: { action: "navigate", page: "/" },
};

const generateResponse = async (prompt) => {
  try {
    
    if (predefinedResponses[prompt.toLowerCase()]) {
      return predefinedResponses[prompt.toLowerCase()];
    }

    
    const context = `
      HopeBridge is a platform designed to help people in poverty by connecting them with resources and support.
      Users can:
      - Register as a citizen to become part of the community.
      - Identify and locate people in poverty within their community.
      - Submit accurate information about those in need to help them access support.

      Example questions and answers:
      - User: What is the mission of HopeBridge?
      - Bot: The mission of HopeBridge is to connect individuals in poverty with resources, support, and opportunities to improve their quality of life.

      - User: How can I register as a citizen?
      - Bot: You can register by visiting the registration page and providing your details.

      - User: How can I help someone in poverty?
      - Bot: You can use the HopeBridge platform to identify those in need and submit their details to ensure they receive the proper support.
      
      Now answer the following question:
    `;

    const fullPrompt = `${context}\n\nUser: ${prompt}`;

    // ✅ Send request to Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: fullPrompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    // ✅ Extract response from Gemini
    const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    
    return botResponse;

  } catch (error) {
    console.error("Error generating response:", error.response?.data || error.message);
    return "I'm having trouble processing your request. Please try again later.";
  }
};

module.exports = { generateResponse };

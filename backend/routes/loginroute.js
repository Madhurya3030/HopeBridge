const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const User = require("../models/user"); 


const router = express.Router();
 
router.use(
  session({
    secret: "mysecretkey", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
  })
);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User does not exist. Please register first." });
    }

    // 2️⃣ Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    // 3️⃣ Store user session data
    req.session.user = { id: user._id, username: user.username };

    res.json({ 
      message: "Login successful", 
    });
    
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed. Try again." });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;

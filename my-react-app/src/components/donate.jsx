import { useState, useEffect } from "react";
import "./donate.css";
import Navbar from "./Navbar";

export default function DonationPaymentPage() {
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Scroll to top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle donor input change
  const handleInputChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  // Handle card details input change
  const handleCardInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // Handle expiry format (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9/]/g, "");
    if (value.length === 2 && !value.includes("/")) {
      value = value + "/";
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  // Custom amount input handler
  const handleCustomAmount = (e) => {
    const value = e.target.value;
    if (value < 0) return;
    setCustomAmount(value);
    setAmount(0);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate phone format (10 digits)
  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  // Validate card details
  const isValidCardDetails = () => {
    const { cardNumber, expiry, cvv, cardHolder } = cardDetails;
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("⚠ Please enter a valid 16-digit card number.");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("⚠ CVV should be 3 digits.");
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      alert("⚠ Expiry date should be in MM/YY format.");
      return false;
    }
    if (!cardHolder) {
      alert("⚠ Please enter the cardholder's name.");
      return false;
    }
    return true;
  };

  // Handle donation submission
  const handleDonation = () => {
    if (!donor.name || !donor.email || !donor.phone || !donor.address) {
      alert("⚠ Please fill in all required donor details.");
      return;
    }
    if (!isValidEmail(donor.email)) {
      alert("⚠ Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(donor.phone)) {
      alert("⚠ Please enter a valid 10-digit phone number.");
      return;
    }

    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (finalAmount <= 0 || isNaN(finalAmount)) {
      alert("⚠ Please enter a valid donation amount.");
      return;
    }

    if (paymentMethod === "card" && !isValidCardDetails()) {
      return;
    }

    

    
    setDonor({
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    });
    setAmount(100);
    setCustomAmount("");
    setPaymentMethod("card");
    setCardDetails({
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });

   alert(`ThankYou for Donating`);
   
  };

  return (
    <>
    <Navbar />
    <div className="donation-container">
      <div className="donation-card">
        <h2>🌍 Make a Difference</h2>
        <p>Support a cause and spread kindness</p>

        {/* Success Message */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Donor Details */}
        <input
          type="text"
          name="name"
          value={donor.name}
          placeholder="Full Name *"
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          value={donor.email}
          placeholder="Email Address *"
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          value={donor.phone}
          placeholder="Phone Number *"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          value={donor.address}
          placeholder="Address *"
          onChange={handleInputChange}
          required
        />
        <textarea
          name="message"
          value={donor.message}
          placeholder="Leave a message (Optional)"
          onChange={handleInputChange}
        ></textarea>

        {/* Amount Selection */}
        <div className="amount-options">
          {[100, 500, 1000, 5000].map((value) => (
            <button
              key={value}
              className={amount === value ? "selected" : ""}
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
              }}
            >
              ₹{value}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <input
          type="number"
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={handleCustomAmount}
        />

        {/* Payment Method */}
        <select
          className="payment-dropdown"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Net Banking</option>
        </select>

        {/* Card Payment */}
        {paymentMethod === "card" && (
          <div className="card-details">
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              placeholder="Card Number"
              onChange={handleCardInputChange}
            />
            <input
              type="text"
              name="cardHolder"
              value={cardDetails.cardHolder}
              placeholder="Cardholder Name"
              onChange={handleCardInputChange}
            />
            <div className="card-row">
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                placeholder="MM/YY"
                onChange={handleExpiryChange}
              />
              <input
                type="password"
                name="cvv"
                value={cardDetails.cvv}
                placeholder="CVV"
                onChange={handleCardInputChange}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button className="donate-btn" onClick={handleDonation}>
          Donate ₹{customAmount || amount}
        </button>
      </div>
    </div>
    </>
  );
}

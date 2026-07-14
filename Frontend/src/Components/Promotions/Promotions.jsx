import React, { useState } from "react";
import "./Promotions.css";

const Promotions = () => {
  const [copiedCode, setCopiedCode] = useState("");

  const offers = [
    {
      id: 1,
      title: "Get 50% OFF",
      desc: "On your first food order today",
      code: "FIRST50",
      color: "linear-gradient(135deg, #ff4b1e 0%, #ff851b 100%)",
      badge: "NEW USER",
    },
    {
      id: 2,
      title: "Free Delivery",
      desc: "Free shipping for orders over ₹199",
      code: "FREEDEL",
      color: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      badge: "POPULAR",
    },
    {
      id: 3,
      title: "Weekend Feast",
      desc: "Flat ₹100 off on order above ₹499",
      code: "WEEKEND100",
      color: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
      badge: "WEEKEND",
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode("");
    }, 2000);
  };

  return (
    <div className="promotions-section">
      <div className="section-title-container">
        <h2>Deals of the Day</h2>
        <p>Claim your exclusive discount coupons and save big on your next meal!</p>
      </div>

      <div className="promotions-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="promo-card" style={{ "--card-bg": offer.color }}>
            <span className="promo-badge">{offer.badge}</span>
            <div className="promo-card-content">
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
            </div>
            <div className="promo-code-box" onClick={() => handleCopy(offer.code)}>
              <span className="promo-code">{offer.code}</span>
              <button className="copy-btn">
                {copiedCode === offer.code ? "Copied! ✅" : "Copy Code"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;

import React from "react";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: "🚴",
      title: "30-Min Delivery",
      desc: "Superfast riders delivering hot and fresh meals directly to your doorstep.",
      gradient: "linear-gradient(135deg, rgba(255, 75, 30, 0.1) 0%, rgba(255, 133, 27, 0.1) 100%)",
      borderColor: "rgba(255, 75, 30, 0.3)",
    },
    {
      id: 2,
      icon: "👨‍🍳",
      title: "Gourmet Chefs",
      desc: "Crafted by the top culinary experts utilizing authentic recipes and finest products.",
      gradient: "linear-gradient(135deg, rgba(142, 45, 226, 0.1) 0%, rgba(74, 0, 224, 0.1) 100%)",
      borderColor: "rgba(142, 45, 226, 0.3)",
    },
    {
      id: 3,
      icon: "🛡️",
      title: "Sanitized Cooking",
      desc: "Contactless delivery, routine temperature checks, and double-masked kitchen staff.",
      gradient: "linear-gradient(135deg, rgba(17, 153, 142, 0.1) 0%, rgba(56, 239, 125, 0.1) 100%)",
      borderColor: "rgba(17, 153, 142, 0.3)",
    },
    {
      id: 4,
      icon: "💬",
      title: "24/7 AI Assistant",
      desc: "Instant live tracking updates and inquiry solutions via our automated assistant.",
      gradient: "linear-gradient(135deg, rgba(0, 180, 219, 0.1) 0%, rgba(0, 131, 176, 0.1) 100%)",
      borderColor: "rgba(0, 180, 219, 0.3)",
    },
  ];

  return (
    <div className="why-choose-us-section">
      <div className="section-title-container">
        <h2>Why Order From Us?</h2>
        <p>We pride ourselves on providing the fastest, safest, and most delicious experience in town.</p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="feature-card"
            style={{
              "--card-gradient": feature.gradient,
              "--card-border": feature.borderColor,
            }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;

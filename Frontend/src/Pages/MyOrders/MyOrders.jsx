import React, { useContext, useEffect, useState, useCallback } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTracking, setActiveTracking] = useState(null);
  const [riderProgress, setRiderProgress] = useState(0);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        url + "api/v1/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

  // Polling for active tracking order
  useEffect(() => {
    let interval;
    if (activeTracking) {
      interval = setInterval(async () => {
        try {
          const response = await axios.post(
            url + "api/v1/order/userorders",
            {},
            { headers: { token } }
          );
          if (response.data.success) {
            const updated = response.data.data.find(
              (o) => o._id === activeTracking._id
            );
            if (updated) {
              setActiveTracking(updated);
            }
          }
        } catch (error) {
          console.error("Tracking poll error:", error);
        }
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [activeTracking, url, token]);

  // Handle rider animation path progress
  useEffect(() => {
    let animationFrame;
    if (activeTracking && activeTracking.status === "Out for Delivery") {
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        // Cycle progress from 0 to 100 every 6 seconds
        const progress = (elapsed % 6000) / 6000;
        setRiderProgress(progress * 100);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    } else if (activeTracking && activeTracking.status === "Delivered") {
      setRiderProgress(100);
    } else {
      setRiderProgress(0);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [activeTracking]);

  const getStatusStep = (status) => {
    switch (status) {
      case "Food Processing":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  const getETA = (status) => {
    switch (status) {
      case "Food Processing":
        return "20-25 mins";
      case "Out for Delivery":
        return "5-10 mins";
      case "Delivered":
        return "Delivered ✅";
      default:
        return "Confirming order...";
    }
  };

  if (loading) {
    return (
      <div className="my-orders-loading">
        <div className="orders-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <div className="my-orders-header-row">
        <h1>My Orders</h1>
        <button onClick={fetchOrders} className="refresh-orders-btn">
          🔄 Refresh Orders
        </button>
      </div>

      <div className="my-orders-layout">
        {/* Left Side: Orders list */}
        <div className="orders-list-panel">
          {orders.length === 0 ? (
            <div className="no-orders-card">
              <p>You haven't placed any orders yet. 🍕</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className={`order-card ${
                  activeTracking?._id === order._id ? "active-selected" : ""
                }`}
              >
                <div className="order-card-header">
                  <div>
                    <span className="order-id">Order ID: #{order._id.substring(order._id.length - 8)}</span>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span className={`order-status-badge ${order.status.toLowerCase().replace(/ /g, "-")}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-items-summary">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-summary-item">
                      <span className="item-details">
                        {item.name} <b>x {item.quantity}</b>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="order-amount">
                    Total Paid: <span>₹{order.amount}</span>
                  </div>
                  {order.payment ? (
                    <button
                      onClick={() => setActiveTracking(order)}
                      className="track-live-btn"
                    >
                      🚴 Track Live
                    </button>
                  ) : (
                    <span className="payment-pending">Payment Failed</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Tracking details & map */}
        <div className="tracking-map-panel">
          {activeTracking ? (
            <div className="tracking-dashboard-card">
              <div className="tracking-dashboard-header">
                <h3>Live Delivery Tracker</h3>
                <span className="tracking-eta">
                  ETA: <b>{getETA(activeTracking.status)}</b>
                </span>
              </div>

              {/* Progress Milestones */}
              <div className="tracking-stepper">
                {[
                  { step: 1, label: "Placed", desc: "Order confirmed" },
                  { step: 2, label: "Kitchen", desc: "Preparing food" },
                  { step: 3, label: "On Way", desc: "Out for delivery" },
                  { step: 4, label: "Arrived", desc: "Delivered" },
                ].map((item) => {
                  const currentStep = getStatusStep(activeTracking.status);
                  const isCompleted = currentStep >= item.step;
                  const isActive = currentStep === item.step;
                  return (
                    <div
                      key={item.step}
                      className={`stepper-node ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                    >
                      <div className="stepper-icon">
                        {item.step === 1 && "📝"}
                        {item.step === 2 && "🍳"}
                        {item.step === 3 && "🚴"}
                        {item.step === 4 && "✅"}
                      </div>
                      <div className="stepper-info">
                        <h4>{item.label}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Roadmap Card */}
              <div className="simulated-map-container">
                <svg className="road-path-svg" viewBox="0 0 400 160">
                  <defs>
                    {/* Road dashes */}
                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4a5568" />
                      <stop offset="100%" stopColor="#2d3748" />
                    </linearGradient>
                  </defs>
                  
                  {/* Curvy Road outline */}
                  <path
                    d="M 30,80 Q 120,20 200,80 T 370,80"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  
                  {/* Road Center line */}
                  <path
                    id="road-path"
                    d="M 30,80 Q 120,20 200,80 T 370,80"
                    fill="none"
                    stroke="url(#roadGrad)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30,80 Q 120,20 200,80 T 370,80"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                    strokeLinecap="round"
                  />

                  {/* Restaurant Marker */}
                  <g transform="translate(25, 80)">
                    <circle r="14" fill="#ff4b1e" />
                    <text y="4" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🍔</text>
                    <text y="-20" textAnchor="middle" fill="#161925" fontSize="10" fontWeight="bold">Restaurant</text>
                  </g>

                  {/* Customer Marker */}
                  <g transform="translate(370, 80)">
                    <circle r="14" fill="#3182ce" />
                    <text y="4" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🏠</text>
                    <text y="-20" textAnchor="middle" fill="#161925" fontSize="10" fontWeight="bold">Home</text>
                  </g>

                  {/* Moving Rider */}
                  {activeTracking.status !== "Delivered" && activeTracking.status !== "Placed" && (
                    <path
                      d="M 30,80 Q 120,20 200,80 T 370,80"
                      fill="none"
                      stroke="transparent"
                      strokeWidth="0"
                    >
                      {/* We simulate coordinates along path based on riderProgress */}
                    </path>
                  )}
                </svg>

                {/* Animated Rider Avatar */}
                <div
                  className="moving-rider-avatar"
                  style={{
                    position: "absolute",
                    left: `${30 + (340 * riderProgress) / 100}px`,
                    // Parabolic curve calculation to follow SVG path roughly
                    top: `${
                      80 +
                      (riderProgress < 50
                        ? -60 * Math.sin((riderProgress * Math.PI) / 50)
                        : 0)
                    }px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="rider-emoji">🚴</div>
                </div>
              </div>

              {/* Courier Bio details */}
              <div className="courier-card">
                <div className="courier-avatar">👨🏽‍✈️</div>
                <div className="courier-info">
                  <h4>Rahul Sharma</h4>
                  <p>Your delivery executive</p>
                </div>
                <div className="courier-actions">
                  <a href="tel:+919876543210" className="courier-call-btn">
                    📞 Call
                  </a>
                  <button
                    onClick={() => toast.info("Chatting feature coming soon!")}
                    className="courier-chat-btn"
                  >
                    💬 Chat
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="select-order-placeholder">
              <div className="placeholder-graphic">🚴💨</div>
              <h3>No Order Tracked</h3>
              <p>Select any active order from the left list and click "Track Live" to view its real-time progress map!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

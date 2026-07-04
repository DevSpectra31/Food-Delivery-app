import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css"
import { StoreContext } from "../../Context/StoreContext";

const ChatBot = () => {
  const { url, token, loadCartData } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I'm your ZipFood AI Assistant. How can I help you order today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!token) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: "Please log in first so I can assist you with your orders and cart! 🔐" }
      ]);
      setInput("");
      return;
    }

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        url + "api/v1/chat/talk",
        {
          message: userMessage,
        },
        {
          headers: {
            token,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            response.data.message ||
            JSON.stringify(response.data.intentData),
        },
      ]);
      await loadCartData(token)
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chat-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat assistant"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-title">
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }}></span>
              ZipFood Copilot ⚡
            </div>
            <div className="chat-header-subtitle">Powered by Gemini AI</div>
          </div>

          {/* Messages */}
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "bot"
                    ? "bot-message"
                    : "user-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bot-message">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask me to add items, list menu, or track orders..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
import React, { useContext, useState } from "react";
import axios from "axios";
import "./Chatbot.css"
import { StoreContext } from "../../Context/StoreContext";

const ChatBot = () => {
  const { url, token,loadCartData } = useContext(StoreContext);

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Show user message
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
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">

          {/* Header */}
          <div className="chat-header">
            Tomato AI 🍅
          </div>

          {/* Messages */}
          <div className="chat-body">

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
                Typing...
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="chat-footer">

            <input
              type="text"
              placeholder="Ask me anything..."
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
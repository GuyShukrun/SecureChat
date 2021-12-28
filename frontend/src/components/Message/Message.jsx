import React from "react";
import "./message.css";

export default function Message({ message, own }) {
  return (
    <div className="message-wrapper bg-white  ">
      {own ? (
        <div className="chat-bubble chat-bubble-right ">
          <span className="chat-bubble-text-right">{message.text}</span>
        </div>
      ) : (
        <div className="chat-bubble ">
          <span className="chat-bubble-text-left">{message.text}</span>
        </div>
      )}
    </div>
  );
}

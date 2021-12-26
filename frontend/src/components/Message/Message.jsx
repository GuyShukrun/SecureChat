import React from "react";
import "./message.css";

export default function Message({ own }) {
  return (
    <div className="message-wrapper bg-white ">
      {own ? (
        <div className="chat-bubble chat-bubble-right">
          <span className="chat-bubble-text-right">Hello dude</span>
        </div>
      ) : (
        <div className="chat-bubble">
          <span className="chat-bubble-text-left">Hello dude</span>
        </div>
      )}
    </div>
  );
}

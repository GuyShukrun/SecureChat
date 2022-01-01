import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Message from "../Message/Message";
import "./messagesScreen.css";

function MessagesScreen({ user, messages, socket }) {
  // Scroll smoothly to the last message if there is scroll-y
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollRef = useRef();

  return (
    <div className="chat-panel  ">
      {messages.map((m) => (
        <div ref={scrollRef}>
          <Message message={m} own={m.sender === user._id} />
        </div>
      ))}
    </div>
  );
}

export default MessagesScreen;

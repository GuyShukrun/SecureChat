import React, { useEffect } from "react";
import { useRef } from "react";
import Message from "../Message/Message";
import "./messagesScreen.css";

function MessagesScreen({ user, messages, socket, setMessages }) {
  const scrollRef = useRef();
  // Scroll smoothly to the last message if there is scroll-y
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-panel  ">
      {messages.map((m) => (
        <div key={m._id} ref={scrollRef}>
          <Message key={m._id} message={m} own={m.sender === user._id} />
        </div>
      ))}
    </div>
  );
}

export default MessagesScreen;

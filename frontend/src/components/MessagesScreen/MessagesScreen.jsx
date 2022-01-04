import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Message from "../Message/Message";
import axios from "axios";
import "./messagesScreen.css";

function MessagesScreen({ user, messages, socket, setMessages }) {
  const scrollRef = useRef();
  // Scroll smoothly to the last message if there is scroll-y
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Whenever current conversation changes, fetch the friend we clicked and all the history messages
  // useEffect(() => {
  //   const getFriend = async () => {
  //     const friendId = currentConversation.members.find(
  //       (member) => member !== user._id
  //     );
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8800/api/users?userId=" + friendId
  //       );
  //       setFriend(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8800/api/messages/" + currentConversation._id
  //       );
  //       setMessages(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (currentConversation) {
  //     getFriend();
  //     getMessages();
  //   }
  // }, [currentConversation]);

  return (
    <div className="chat-panel  ">
      {messages.map((m, key) => (
        <div key={m._id} ref={scrollRef}>
          <Message key={m._id} message={m} own={m.sender === user._id} />
        </div>
      ))}
    </div>
  );
}

export default MessagesScreen;

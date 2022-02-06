import React from "react";
import "./chat.css";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import ContactsScreen from "../../components/ContactsScreen/ContactsScreen";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
export default function Chat({ user, setUser }) {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [lastMessage, setLastMessage] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [searchConversations, setSearchConversations] = useState([]);
  const [usersNoConversationsFound, setUsersNoConversationsFound] = useState(
    []
  );
  const socket = useRef();

  // Set socket on first render
  // Set behavior on getting message
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        conversation: data.conversation,
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket?.current.emit("addUser", user._id);
    socket?.current.on("getUsers", (users) => {});
  }, [user]);

  return (
    <div className="container h-100">
      <div className="row no-gutters ">
        <div className="col-4 border-right">
          <ContactsScreen
            socket={socket}
            user={user}
            setUser={setUser}
            setCurrentConversation={setCurrentConversation}
            lastMessage={lastMessage}
            setLastMessage={setLastMessage}
            arrivalMessage={arrivalMessage}
            conversations={conversations}
            setConversations={setConversations}
            searchConversations={searchConversations}
            setSearchConversations={setSearchConversations}
            usersNoConversationsFound={usersNoConversationsFound}
            setUsersNoConversationsFound={setUsersNoConversationsFound}
            currentConversation={currentConversation}
          />
        </div>

        <div className="col-8 ">
          <ChatScreen
            currentConversation={currentConversation}
            user={user}
            socket={socket}
            arrivalMessage={arrivalMessage}
            setLastMessage={setLastMessage}
            conversations={conversations}
            setConversations={setConversations}
            searchConversations={searchConversations}
            setSearchConversations={setSearchConversations}
            usersNoConversationsFound={usersNoConversationsFound}
            setUsersNoConversationsFound={setUsersNoConversationsFound}
            setCurrentConversation={setCurrentConversation}
          />
        </div>
      </div>{" "}
      {/* row end*/}
    </div>
  );
}

import React from "react";
import "./chat.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import Conversation from "../../components/Conversation/Conversation";
import User from "../../components/User/User";
import ContactsScreen from "../../components/ContactsScreen/ContactsScreen";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
export default function Chat({ user, setUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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

  // // if arrivalMessage is not null and it's from the sender, expand the messages..
  // useEffect(() => {
  //   arrivalMessage &&
  //     currentConversation?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentConversation]);

  // useEffect(() => {
  //   if (arrivalMessage) {
  //     if (
  //       arrivalMessage.conversation &&
  //       !conversations.includes(arrivalMessage.conversation)
  //     ) {
  //       setConversations([]);
  //       setTimeout(() => {
  //         let conv = [arrivalMessage.conversation, ...conversations];
  //         setConversations(conv);
  //       }, 200);
  //     } else {
  //       console.log("got in2");
  //       // let conv = [...conversations];
  //       // setConversations([]);
  //       // setConversations(conv);
  //       setGotMessage(!gotMessage);
  //     }
  //   }
  // }, [arrivalMessage]);

  useEffect(() => {
    socket?.current.emit("addUser", user._id);
    socket?.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  // Get conversations useEffect
  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8800/api/conversations/" + user._id
  //       );
  //       setConversations(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getConversations();
  // }, []);

  // Get messages of current conversation
  // useEffect(() => {
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
  //   getMessages();
  // }, [currentConversation]);

  // Scroll smoothly to the last message if there is scroll-y
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // Fetch user accodrding to current chat
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
  //   if (currentConversation) getFriend();
  // }, [currentConversation]);

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

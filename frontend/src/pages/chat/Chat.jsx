import React from "react";
import "./chat.css";
import { useRef, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import Message from "../../components/Message/Message";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import Conversation from "../../components/Conversation/Conversation";
import User from "../../components/User/User";
import ContactsScreen from "../../components/ContactsScreen/ContactsScreen";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
export default function Chat({ user, setUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [conversations, setConversations] = useState([]);
  const [friend, setFriend] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [usersNoConversationsFound, setUsersNoConversationsFound] = useState(
    []
  );
  const [gotMessage, setGotMessage] = useState(false);
  const [searchConversations, setSearchConversations] = useState([]);

  const message = useRef("");
  const scrollRef = useRef();
  const search = useRef("");
  const socket = useRef();

  const handleLogout = () => {
    socket.current.disconnect();
    setUser(null);
    localStorage.clear();
  };

  // const handleSearch = async () => {
  //   if (search.current.value) {
  //     setIsSearching(true);
  //     setSearchConversations([]);

  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8800/api/users/search/" + search.current.value
  //       );
  //       const usersWithConversation = res.data.filter(
  //         (user2) =>
  //           user2._id !== user._id &&
  //           conversations.some((c) => c.members.includes(user2._id))
  //       );
  //       const usersWithoutConversations = res.data.filter(
  //         (user2) =>
  //           user._id != user2._id && !usersWithConversation.includes(user2)
  //       );

  //       const conversationsSearch = conversations.filter((c) =>
  //         usersWithConversation.some((user2) => c.members.includes(user2._id))
  //       );
  //       setSearchConversations(conversationsSearch);
  //       setUsersNoConversationsFound(usersWithoutConversations);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setUsersNoConversationsFound([]);
  //     setSearchConversations([]);
  //     setIsSearching(false);
  //   }
  // };

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

  // if arrivalMessage is not null and it's from the sender, expand the messages..
  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  useEffect(() => {
    if (arrivalMessage) {
      if (
        arrivalMessage.conversation &&
        !conversations.includes(arrivalMessage.conversation)
      ) {
        setConversations([]);
        setTimeout(() => {
          let conv = [arrivalMessage.conversation, ...conversations];
          setConversations(conv);
        }, 200);
      } else {
        console.log("got in2");
        // let conv = [...conversations];
        // setConversations([]);
        // setConversations(conv);
        setGotMessage(!gotMessage);
      }
    }
  }, [arrivalMessage]);

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

  // Handling send message
  const handleSendMessage = async () => {
    if (message.current.value) {
      const newMessage = {
        conversationId: currentConversation._id,
        sender: user._id,
        text: message.current.value,
      };
      // TODO: merge the code together
      let newConversation = null;
      try {
        if (!newMessage.conversationId) {
          const res = await axios.post(
            "http://localhost:8800/api/conversations",
            { senderId: user._id, receiverId: friend._id }
          );

          conversations.unshift(res.data);
          searchConversations.unshift(res.data);
          const cloneConversations = [...searchConversations];
          setSearchConversations([]);
          setSearchConversations(cloneConversations);

          let cloneUsers = [...usersNoConversationsFound];
          cloneUsers = cloneUsers.filter((user1) => user1._id !== friend._id);
          setUsersNoConversationsFound([]);
          setUsersNoConversationsFound(cloneUsers);
          setConversations(conversations);
          newMessage.conversationId = res.data._id;
          newConversation = res.data;
        }

        const res = await axios.post(
          "http://localhost:8800/api/messages/",
          newMessage
        );
        setGotMessage(!gotMessage);
        setMessages([...messages, res.data]);

        if (newConversation) setCurrentConversation(newConversation);

        socket.current.emit("sendMessage", {
          conversation: newConversation,
          senderId: user._id,
          receiverId: friend._id,
          text: message.current.value,
        });

        message.current.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const searchInProgress = () => {
    if (
      searchConversations.length > 0 &&
      usersNoConversationsFound.length > 0
    ) {
      return (
        <>
          <div className="tab">Chats</div>
          {searchConversations.map((c) => (
            <div onClick={() => setCurrentConversation(c)}>
              <Conversation
                conversation={c}
                currentUser={user}
                gotMessage={gotMessage}
              />
            </div>
          ))}
          <div className="tab">Friends</div>
          {usersNoConversationsFound.map((friend) => (
            <div
              onClick={() =>
                setCurrentConversation({
                  _id: null,
                  members: [friend._id, user._id],
                })
              }
            >
              <User user={friend} />
            </div>
          ))}
        </>
      );
    } else if (searchConversations.length > 0) {
      return (
        <>
          <div className="tab">Chats</div>
          {searchConversations.map((c) => (
            <div onClick={() => setCurrentConversation(c)}>
              <Conversation
                conversation={c}
                currentUser={user}
                gotMessage={gotMessage}
              />
            </div>
          ))}
        </>
      );
    } else if (usersNoConversationsFound.length > 0) {
      return (
        <>
          <div className="tab">Friends</div>
          {usersNoConversationsFound.map((friend) => (
            <div
              onClick={() =>
                setCurrentConversation({
                  _id: null,
                  members: [friend._id, user._id],
                })
              }
            >
              <User user={friend} />
            </div>
          ))}
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="container h-100">
      <div className="row no-gutters ">
        <div className="col-4 border-right">
          {/* <div className="settings-tray">
            <img
              className="rounded-circle profile-img"
              src={PF + "/" + user.profilePicture}
              alt="User's profile"
            />
            <LogoutIcon className="settingsIcon" onClick={handleLogout} />
          </div>
          <div className="search-box">
            <div className="input-group rounded">
              <span className="input-group-text border-0 bg-white">
                <SearchIcon className="bg-white text-secondary" />
              </span>
              <input
                ref={search}
                type="search"
                className="form-control rounded border-0 shadow-none"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="conversations-container bg-white ">
            {isSearching
              ? searchInProgress()
              : conversations.map((c) => (
                  <div onClick={() => setCurrentConversation(c)}>
                    <Conversation
                      conversation={c}
                      currentUser={user}
                      gotMessage={gotMessage}
                    />
                  </div>
                ))}
          </div> */}

          <ContactsScreen
            socket={socket}
            user={user}
            setUser={setUser}
            setCurrentConversation={setCurrentConversation}
          />
        </div>

        <div className="col-8 ">
          <ChatScreen
            currentConversation={currentConversation}
            user={user}
            socket={socket}
          />
          {/* {currentConversation ? (
            <>
              <div className="upper-chat ">
                <img
                  className="profile-img rounded-circle  "
                  src={PF + "/" + friend?.profilePicture}
                  alt=""
                />
                <h6 className="user-fullname-upper-chat">{friend?.fullname}</h6>
              </div>
              <div className="chat-panel  ">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>

              <div className="lower-chat">
                <div className="send-message-box">
                  <div className="input-group rounded input-message">
                    <input
                      ref={message}
                      type="text"
                      className="form-control rounded border-0 shadow-none "
                      placeholder="Type something..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                    />
                  </div>
                  <SendIcon className="send-icon" onClick={handleSendMessage} />
                </div>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat or search for new friends!
            </span>
          )} */}
        </div>
      </div>{" "}
      {/* row end*/}
    </div>
  );
}

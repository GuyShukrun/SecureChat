import React, { useState, useEffect } from "react";
import InputMessage from "../InputMessage/InputMessage";
import MessagesScreen from "../MessagesScreen/MessagesScreen";
import "./chatScreen.css";
import { getMessagesInConversation, getUser } from "../../apiCalls";
function ChatScreen({
  currentConversation,
  user,
  socket,
  arrivalMessage,
  setLastMessage,
  conversations,
  setConversations,
  searchConversations,
  setSearchConversations,
  usersNoConversationsFound,
  setUsersNoConversationsFound,
  setCurrentConversation,
}) {
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  // Whenever current conversation changes, fetch the friend we clicked and all the history messages
  useEffect(() => {
    const getFriend = async () => {
      const friendId = currentConversation.members.find(
        (member) => member !== user._id
      );
      try {
        const friend = await getUser(friendId, localStorage.getItem("token"));
        setFriend(friend.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getMessages = async () => {
      try {
        const messages = await getMessagesInConversation(
          currentConversation._id,
          localStorage.getItem("token")
        );
        setMessages(messages.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentConversation) {
      getFriend();
      getMessages();
    }
  }, [currentConversation]);

  // if arrivalMessage is not null and it's from the sender, expand the messages..

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  if (currentConversation && friend) {
    return (
      <>
        <div className="upper-chat ">
          <img
            className="profile-img rounded-circle  "
            src={friend?.profilePicture}
            alt=""
          />
          <h6 className="user-fullname-upper-chat">{friend?.fullname}</h6>
        </div>
        <MessagesScreen messages={messages} user={user} socket={socket} />
        <InputMessage
          messages={messages}
          setMessages={setMessages}
          currentConversation={currentConversation}
          user={user}
          socket={socket}
          friend={friend}
          setLastMessage={setLastMessage}
          conversations={conversations}
          setConversations={setConversations}
          searchConversations={searchConversations}
          setSearchConversations={setSearchConversations}
          usersNoConversationsFound={usersNoConversationsFound}
          setUsersNoConversationsFound={setUsersNoConversationsFound}
          setCurrentConversation={setCurrentConversation}
        />
      </>
    );
  } else
    return (
      <span className="noConversationText">
        Open a conversation to start a chat or search for new friends!
      </span>
    );
}

export default ChatScreen;

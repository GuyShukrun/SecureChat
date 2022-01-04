import React, { useState, useEffect } from "react";
import Conversation from "../Conversation/Conversation";
import User from "../User/User";
import axios from "axios";
import "./userslist.css";

function UsersList({
  setCurrentConversation,
  isSearching,
  lastMessage,
  conversations,
  usersNoConversationsFound,
  searchConversations,
  user,
  setLastMessage,
  arrivalMessage,
  setConversations,
}) {
  // If a user get message and he doesnt own the converstion, means it's new conversation, add the conversation to his converation list
  useEffect(() => {
    const getConvesationAccordingToMessage = async () => {
      if (
        arrivalMessage &&
        !conversations.some((c) => c._id === arrivalMessage.conversation._id)
      ) {
        const res = await axios(
          "http://localhost:8800/api/conversations/" + user._id
        );
        // setConversations([]);
        setConversations(res.data);
      }
    };

    getConvesationAccordingToMessage();
  }, [arrivalMessage]);

  const searchInProgress = () => {
    if (
      searchConversations.length > 0 &&
      usersNoConversationsFound.length > 0
    ) {
      return (
        <>
          <div className="tab">Chats</div>
          {searchConversations.map((c, key) => (
            <div
              key={c.members.find((mem) => mem !== user._id)}
              onClick={() => setCurrentConversation(c)}
            >
              <Conversation
                key={c.members.find((mem) => mem !== user._id)}
                conversation={c}
                currentUser={user}
                setLastMessage={setLastMessage}
                lastMessage={lastMessage}
                arrivalMessage={arrivalMessage}
              />
            </div>
          ))}
          <div className="tab">Friends</div>
          {usersNoConversationsFound.map((friend, key) => (
            <div
              key={friend._id}
              onClick={() =>
                setCurrentConversation({
                  _id: null,
                  members: [friend._id, user._id],
                })
              }
            >
              <User key={friend._id} user={friend} />
            </div>
          ))}
        </>
      );
    } else if (searchConversations.length > 0) {
      return (
        <>
          <div className="tab">Chats</div>
          {searchConversations.map((c, key) => (
            <div
              key={c.members.find((mem) => mem !== user._id)}
              onClick={() => setCurrentConversation(c)}
            >
              <Conversation
                key={c.members.find((mem) => mem !== user._id)}
                conversation={c}
                currentUser={user}
                lastMessage={lastMessage}
                setLastMessage={setLastMessage}
                arrivalMessage={arrivalMessage}
              />
            </div>
          ))}
        </>
      );
    } else if (usersNoConversationsFound.length > 0) {
      return (
        <>
          <div className="tab">Friends</div>
          {usersNoConversationsFound.map((friend, key) => (
            <div
              key={friend._id}
              onClick={() =>
                setCurrentConversation({
                  _id: null,
                  members: [friend._id, user._id],
                })
              }
            >
              <User key={friend._id} user={friend} />
            </div>
          ))}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="conversations-container bg-white ">
      {isSearching
        ? searchInProgress()
        : conversations.map((c, key) => (
            <div
              key={c.members.find((mem) => mem !== user._id)}
              onClick={() => setCurrentConversation(c)}
            >
              <Conversation
                key={c.members.find((mem) => mem !== user._id)}
                conversation={c}
                currentUser={user}
                lastMessage={lastMessage}
                setLastMessage={setLastMessage}
                arrivalMessage={arrivalMessage}
              />
            </div>
          ))}
    </div>
  );
}

export default UsersList;

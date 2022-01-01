import React, { useState } from "react";
import Conversation from "../Conversation/Conversation";
import User from "../User/User";

import "./userslist.css";

function UsersList({
  setCurrentConversation,
  isSearching,

  conversations,
  usersNoConversationsFound,
  searchConversations,
  user,
}) {
  const [gotMessage, setGotMessage] = useState(false);
  const searchInProgress = () => {
    if (
      searchConversations.length > 0 &&
      usersNoConversationsFound.length > 0
    ) {
      return (
        <>
          <div className="tab">Chats</div>
          {searchConversations.map((c, key) => (
            <div key={key} onClick={() => setCurrentConversation(c)}>
              <Conversation
                conversation={c}
                currentUser={user}
                gotMessage={gotMessage}
              />
            </div>
          ))}
          <div className="tab">Friends</div>
          {usersNoConversationsFound.map((friend, key) => (
            <div
              key={key}
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
          {searchConversations.map((c, key) => (
            <div key={key} onClick={() => setCurrentConversation(c)}>
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
          {usersNoConversationsFound.map((friend, key) => (
            <div
              key={key}
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
    <div className="conversations-container bg-white ">
      {isSearching
        ? searchInProgress()
        : conversations.map((c, key) => (
            <div key={key} onClick={() => setCurrentConversation(c)}>
              <Conversation
                conversation={c}
                currentUser={user}
                gotMessage={gotMessage}
              />
            </div>
          ))}
    </div>
  );
}

export default UsersList;

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "./conversation.css";
import {
  getLastMessageFromConversation,
  getUser,
  updateConversation,
} from "../../apiCalls";
export default function Conversation({
  conversation,
  currentUser,
  lastMessage,
  setLastMessage,
  arrivalMessage,
  conversationReset,
  currentConversation,
  setCurrentConversation,
  socket,
}) {
  const token = localStorage.getItem("token");
  const [ownLastMessage, setOwnLastMessage] = useState(null);
  const [messageCounter, setMessageCounter] = useState(0);
  const [user, setUser] = useState(null); // Friend user
  const ownIndex = conversation.members.indexOf(currentUser._id);
  const didMountRef = useRef(false);

  // Function to update message counter in the DB
  const updateMessageCounter = async (count) => {
    try {
      if (ownIndex === 0) {
        await updateConversation(
          conversation._id,
          {
            messageCounterMember1: `${count}`,
          },
          token
        );
      } else {
        await updateConversation(
          conversation._id,
          {
            messageCounterMember2: `${count}`,
          },
          token
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      conversationReset &&
      conversationReset.conversation._id === conversation._id
    ) {
      if (ownIndex === 0) conversation.messageCounterMember2 = 0;
      else conversation.messageCounterMember1 = 0;
      if (currentConversation?._id === conversation._id)
        setCurrentConversation(conversation);
    }
  }, [conversationReset]);
  // On first render - we get the user we talk to, last message and message counter
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    ownIndex === 0
      ? setMessageCounter(conversation.messageCounterMember1)
      : setMessageCounter(conversation.messageCounterMember2);

    const getFriend = async () => {
      try {
        const friend = await getUser(friendId, token);
        setUser(friend.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getLastMessage = async () => {
      try {
        const res = await getLastMessageFromConversation(
          conversation._id,
          token
        );
        setOwnLastMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriend();
    getLastMessage();
  }, []);

  // Changes own state of last message only if the message is related to this conversation!
  useEffect(() => {
    if (lastMessage?.conversationId === conversation._id) {
      setOwnLastMessage(lastMessage);
    }
  }, [lastMessage]);

  // reset message counter , change the value in the DB aswell
  useEffect(() => {
    if (currentConversation && currentConversation._id === conversation._id) {
      updateMessageCounter("0");
      setMessageCounter(0);
      socket.current.emit("resetCounter", {
        conversation: currentConversation,
        receiverId: user._id,
      });
    }
  }, [currentConversation]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (
      arrivalMessage &&
      arrivalMessage.conversation._id === conversation._id
    ) {
      setOwnLastMessage(arrivalMessage);
    }

    if (
      (arrivalMessage &&
        arrivalMessage.conversation._id === conversation._id &&
        currentConversation &&
        currentConversation._id !== conversation._id) ||
      (arrivalMessage &&
        !currentConversation &&
        arrivalMessage.conversation._id === conversation._id)
    ) {
      // updateMessageCounter(messageCounter + 1);
      setMessageCounter(messageCounter + 1);
    } else if (
      arrivalMessage &&
      arrivalMessage.conversation._id === conversation._id &&
      currentConversation &&
      currentConversation._id === conversation._id
    ) {
      updateMessageCounter("0");
      setMessageCounter(0);
      socket.current.emit("resetCounter", {
        conversation: currentConversation,
        receiverId: user._id,
      });
    }
  }, [arrivalMessage]);

  const handleMessageCounter = () => {
    if (messageCounter && messageCounter !== 0)
      return (
        <span className="rounded-circle message-counter">{messageCounter}</span>
      );
    else return null;
  };

  if (user === null || ownLastMessage === null) return null;
  else
    return (
      <>
        <div className="conversation bg-white">
          <img
            className="profile-img rounded-circle"
            src={user?.profilePicture}
            alt=""
          />
          <div className="conversation-user-text bg-white ">
            <h6 className="bg-white user-fullname">{user?.fullname}</h6>

            <p className="text-muted bg-white message-preview">
              {ownLastMessage?.text}
            </p>
          </div>

          <div className="bg-white time-message-counter">
            <span className="time text-muted small bg-white float-right">
              {new Date(ownLastMessage?.createdAt).toLocaleTimeString("en-il", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {handleMessageCounter()}
          </div>
        </div>
        <hr />
      </>
    );
}

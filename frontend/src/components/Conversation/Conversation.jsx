import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";
export default function Conversation({
  conversation,
  currentUser,
  lastMessage,
  setLastMessage,
  arrivalMessage,
  currentConversation,
}) {
  const [ownLastMessage, setOwnLastMessage] = useState(null);
  const [messageCounter, setMessageCounter] = useState(0);
  const [user, setUser] = useState(null); // Friend user
  const ownIndex = conversation.members.indexOf(currentUser._id);
  const didMountRef = useRef(false);

  // Function to update message counter in the DB
  const updateMessageCounter = async (count) => {
    try {
      if (ownIndex === 0) {
        await axios.put(
          "http://localhost:8800/api/conversations/" + conversation._id,
          {
            messageCounterMember1: `${count}`,
          }
        );
      } else {
        await axios.put(
          "http://localhost:8800/api/conversations/" + conversation._id,
          {
            messageCounterMember2: `${count}`,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  // On first render - we get the user we talk to, last message and message counter
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    ownIndex === 0
      ? setMessageCounter(conversation.messageCounterMember1)
      : setMessageCounter(conversation.messageCounterMember2);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:8800/api/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  //Get last message when first render
  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const res = await axios(
          "http://localhost:8800/api/messages/lastMessage/" + conversation._id
        );
        // setLastMessage(res.data);
        setOwnLastMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
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
      updateMessageCounter(messageCounter + 1);
      setMessageCounter(messageCounter + 1);
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

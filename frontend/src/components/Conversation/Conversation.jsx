import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";
export default function Conversation({
  conversation,
  currentUser,
  lastMessage,
  setLastMessage,
  arrivalMessage,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ownLastMessage, setOwnLastMessage] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
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

  // Get last message when first render
  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const res = await axios(
          "http://localhost:8800/api/messages/lastMessage/" + conversation._id
        );
        setLastMessage(res.data);
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

  // Change own state of last message if I got message through the socket

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.conversation._id === conversation._id &&
      setOwnLastMessage(arrivalMessage);
  }, [arrivalMessage]);

  if (user === null || ownLastMessage === null) return null;
  else
    return (
      <>
        <div className="conversation bg-white">
          <img
            className="profile-img rounded-circle"
            src={PF + "/" + user?.profilePicture}
            alt=""
          />
          <div className="conversation-user-text bg-white ">
            <h6 className="bg-white user-fullname">{user?.fullname}</h6>
            <p className="text-muted bg-white message-preview">
              {ownLastMessage?.text}
            </p>
          </div>
          <span className="time text-muted small bg-white float-right">
            {new Date(ownLastMessage?.createdAt).toLocaleTimeString("en-il", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <hr />
      </>
    );
}

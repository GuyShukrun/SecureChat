import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";
export default function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
            Last message preview
          </p>
        </div>
        <span className="time text-muted small bg-white float-right">
          13:21
        </span>
      </div>
      <hr />
    </>
  );
}

import React from "react";
import "./conversation.css";
export default function Conversation() {
  return (
    <>
      <div className="conversation bg-white">
        <img
          className="profile-img rounded-circle img-fluid"
          src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
          alt=""
        />
        <div className="conversation-user-text bg-white ">
          <h6 className="bg-white user-fullname">User fullname</h6>
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

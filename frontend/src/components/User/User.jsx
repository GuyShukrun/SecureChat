import { useState } from "react";
import "./user.css";

export default function User({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (user) {
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
          </div>
        </div>
        <hr />
      </>
    );
  } else return null;
}

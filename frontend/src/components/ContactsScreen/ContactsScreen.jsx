import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import UsersList from "../UsersList/UsersList";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./contactsScreen.css";

function ContactsScreen({
  currentConversation,
  socket,
  user,
  setUser,
  setCurrentConversation,
  lastMessage,
  setLastMessage,
  arrivalMessage,
  conversations,
  setConversations,
  searchConversations,
  setSearchConversations,
  usersNoConversationsFound,
  setUsersNoConversationsFound,
}) {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, []);
  // Handle logout function
  const handleLogout = () => {
    socket.current.disconnect();
    setUser(null);
    localStorage.clear();
  };

  return (
    <>
      <div className="settings-tray">
        <img
          className="rounded-circle profile-img"
          src={user.profilePicture}
          alt="User's profile"
        />
        <LogoutIcon className="settingsIcon" onClick={handleLogout} />
      </div>
      <SearchBar
        setIsSearching={setIsSearching}
        user={user}
        setConversations={setConversations}
        setUsersNoConversationsFound={setUsersNoConversationsFound}
        setSearchConversations={setSearchConversations}
        conversations={conversations}
      />
      <UsersList
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
        isSearching={isSearching}
        conversations={conversations}
        usersNoConversationsFound={usersNoConversationsFound}
        searchConversations={searchConversations}
        setConversations={setConversations}
        user={user}
        lastMessage={lastMessage}
        setLastMessage={setLastMessage}
        arrivalMessage={arrivalMessage}
      />
    </>
  );
}

export default ContactsScreen;

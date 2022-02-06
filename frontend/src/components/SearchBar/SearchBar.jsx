import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./searchBar.css";
import { searchUserCall, getUserConversations } from "../../apiCalls";

function SearchBar({
  setIsSearching,
  user,
  setSearchConversations,
  setConversations,
  setUsersNoConversationsFound,
}) {
  const search = useRef("");

  const handleSearch = async () => {
    if (search.current.value) {
      setIsSearching(true);
      setSearchConversations([]);
      setUsersNoConversationsFound([]);

      try {
        const users = await searchUserCall(search.current.value);
        const conversations = await getUserConversations(user._id);
        setConversations(conversations.data);
        const usersWithConversation = users.data.filter(
          (user2) =>
            user2._id !== user._id &&
            conversations.data.some((c) => c.members.includes(user2._id))
        );
        const usersWithoutConversations = users.data.filter(
          (user2) =>
            user._id !== user2._id && !usersWithConversation.includes(user2)
        );

        const conversationsSearch = conversations.data.filter((c) =>
          usersWithConversation.some((user2) => c.members.includes(user2._id))
        );
        setSearchConversations(conversationsSearch);
        setUsersNoConversationsFound(usersWithoutConversations);
      } catch (error) {
        console.log(error);
      }
    } else {
      setUsersNoConversationsFound([]);
      setSearchConversations([]);
      setIsSearching(false);
    }
  };

  return (
    <div className="search-box">
      <div className="input-group rounded">
        <span className="input-group-text border-0 bg-white">
          <SearchIcon className="bg-white text-secondary" />
        </span>
        <input
          ref={search}
          type="search"
          className="form-control rounded border-0 shadow-none"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;

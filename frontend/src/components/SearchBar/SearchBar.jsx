import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./searchBar.css";

function SearchBar({
  setIsSearching,
  user,
  setSearchConversations,
  conversations,
  setUsersNoConversationsFound,
}) {
  const search = useRef("");

  const handleSearch = async () => {
    if (search.current.value) {
      setIsSearching(true);
      setSearchConversations([]);
      setUsersNoConversationsFound([]);

      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/search/" + search.current.value
        );
        const usersWithConversation = res.data.filter(
          (user2) =>
            user2._id !== user._id &&
            conversations.some((c) => c.members.includes(user2._id))
        );
        const usersWithoutConversations = res.data.filter(
          (user2) =>
            user._id != user2._id && !usersWithConversation.includes(user2)
        );

        const conversationsSearch = conversations.filter((c) =>
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

  // useEffect(()=>{
  //   if (newChat)
  //   setSearchConversations([res.data,...searchConversations]);
  // },[newChat])
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

import "./userslist.css";

export default function UsersList() {
  return (
    <>
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
      <div className="conversations-container bg-white ">
        {searchConversations.length > 0
          ? isSearching && <div className="tab">Chats</div>
          : null}
        {isSearching
          ? // Displaying exist chats according to search
            searchConversations.map((c) => (
              <div onClick={() => setCurrentConversation(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))
          : conversations.map((c) => (
              <div onClick={() => setCurrentConversation(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}

        {usersNoConversationsFound.length > 0
          ? isSearching && <div className="tab">Friends</div>
          : null}

        {isSearching
          ? // Displaying non exist chats
            usersNoConversationsFound.map((friend) => (
              <div
                onClick={() =>
                  // setCurrentConversation({
                  //   _id: null,
                  //   members: [friend._id, user._id],
                  // })
                  console.log("click")
                }
              >
                <User user={friend} />
              </div>
            ))
          : null}
      </div>
    </>
  );
}

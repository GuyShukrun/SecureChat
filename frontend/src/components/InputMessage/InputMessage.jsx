import React, { useRef } from "react";
import "./inputMessage.css";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import CryptoJS from "crypto-js";

function InputMessage({
  messages,
  setMessages,
  currentConversation,
  setCurrentConversation,
  user,
  socket,
  friend,
  setLastMessage,
  conversations,
  setConversations,
  searchConversations,
  setSearchConversations,
  usersNoConversationsFound,
  setUsersNoConversationsFound,
}) {
  const handleSendMessage = async () => {
    if (message.current.value) {
      const newMessage = {
        conversationId: currentConversation._id,
        sender: user._id,
        text: message.current.value,
      };
      // TODO: merge the code together
      let newConversation = currentConversation;
      try {
        if (!newMessage.conversationId) {
          const res = await axios.post(
            "http://localhost:8800/api/conversations",
            { senderId: user._id, receiverId: friend._id }
          );
          setConversations([res.data, ...conversations]);
          let copy = searchConversations;
          // setSearchConversations([]);
          setSearchConversations([res.data, ...copy]);
          // Clear out the user we started talking to
          let cloneUsers = [...usersNoConversationsFound];
          cloneUsers = cloneUsers.filter((user1) => user1._id !== friend._id);
          setUsersNoConversationsFound(cloneUsers);
          newConversation = res.data;
          newMessage.conversationId = res.data._id;
          // newConversation = res.data;
        }

        const res = await axios.post(
          "http://localhost:8800/api/messages/",
          newMessage
        );

        // setGotMessage(!gotMessage);
        setMessages([...messages, res.data]);
        setLastMessage(res.data);
        setCurrentConversation(newConversation);

        // if (newConversation) setCurrentConversation(newConversation);

        socket.current.emit("sendMessage", {
          conversation: newConversation,
          senderId: user._id,
          receiverId: friend._id,
          text: message.current.value,
        });

        message.current.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const message = useRef("");
  return (
    <div className="lower-chat">
      <div className="send-message-box">
        <div className="input-group rounded input-message">
          <input
            ref={message}
            type="text"
            className="form-control rounded border-0 shadow-none "
            placeholder="Type something..."
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
        </div>
        <SendIcon className="send-icon" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default InputMessage;

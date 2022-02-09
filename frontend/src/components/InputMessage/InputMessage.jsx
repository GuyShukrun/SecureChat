import React, { useRef } from "react";
import "./inputMessage.css";
import SendIcon from "@mui/icons-material/Send";

import {
  postNewConversation,
  postNewMessage,
  updateConversation,
} from "../../apiCalls";

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
  const ownIndex = currentConversation.members.indexOf(user._id);
  const token = localStorage.getItem("token");
  const handleSendMessage = async () => {
    if (message.current.value) {
      const newMessage = {
        conversationId: currentConversation._id,
        sender: user._id,
        text: message.current.value,
      };
      let newMessageRes = null;
      let newConversation = currentConversation;
      try {
        if (!newMessage.conversationId) {
          const res = await postNewConversation(
            {
              senderId: user._id,
              receiverId: friend._id,
              messageCounterMember1: 0,
              messageCounterMember2: 1,
            },
            token
          );
          newMessage.conversationId = res.data._id;
          newMessageRes = await postNewMessage(newMessage, token);

          setConversations([res.data, ...conversations]);
          let copy = searchConversations;
          // setSearchConversations([]);
          setSearchConversations([res.data, ...copy]);
          // Clear out the user we started talking to
          let cloneUsers = [...usersNoConversationsFound];
          cloneUsers = cloneUsers.filter((user1) => user1._id !== friend._id);
          setUsersNoConversationsFound(cloneUsers);
          newConversation = res.data;

          // newConversation = res.data;
        } else {
          newMessageRes = await postNewMessage(newMessage, token);
          // update message counter on the local copy

          if (ownIndex === 0) {
            newConversation.messageCounterMember2++;
          } else {
            newConversation.messageCounterMember1++;
          }
        }
        // post new message

        //Update current conversation last message for displaying && message counter
        await updateConversation(
          newConversation._id,
          { lastMessage: newMessage.text },
          token
        );

        ownIndex === 0
          ? await updateConversation(
              newConversation._id,
              {
                messageCounterMember2: newConversation.messageCounterMember2,
              },
              token
            )
          : await updateConversation(
              newConversation._id,
              {
                messageCounterMember1: newConversation.messageCounterMember1,
              },
              token
            );

        setMessages([...messages, newMessageRes.data]);
        setLastMessage(newMessageRes.data);
        setCurrentConversation(newConversation);

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
  // const updateMessageCounter = async (count) => {
  //   try {
  //     if (ownIndex === 0) {
  //       // update the user we sented him the message
  //       await updateConversation(
  //         newConversation._id,
  //         {
  //           messageCounterMember2: `${count}`,
  //         },
  //         token
  //       );
  //     } else {
  //       await updateConversation(
  //         newConversation._id,
  //         {
  //           messageCounterMember1: `${count}`,
  //         },
  //         token
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

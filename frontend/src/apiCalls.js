import axios from "axios";

export const loginCall = async (userCredentials) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/users/login",
      userCredentials
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const registerCall = async (userCredentials) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/users/register",
      userCredentials
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const searchUserCall = async (userToSearch) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/users/search/" + userToSearch
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserConversations = async (userId) => {
  try {
    const res = await axios(
      "http://localhost:8800/api/conversations/" + userId
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/users?userId=" + userId
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesInConversation = async (conversationId) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/messages/" + conversationId
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateConversation = async (conversationId, updates) => {
  try {
    const res = await axios.put(
      "http://localhost:8800/api/conversations/" + conversationId,
      updates
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLastMessageFromConversation = async (conversationId) => {
  try {
    const res = await axios(
      "http://localhost:8800/api/messages/lastMessage/" + conversationId
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postNewConversation = async (newConversation) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/conversations",
      newConversation
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postNewMessage = async (newMessage) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/messages/",
      newMessage
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

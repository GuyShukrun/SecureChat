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

export const searchUserCall = async (userToSearch, token) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/users/search/" + userToSearch,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserConversations = async (userId, token) => {
  try {
    const res = await axios(
      "http://localhost:8800/api/conversations/" + userId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId, token) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/users?userId=" + userId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesInConversation = async (conversationId, token) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/messages/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateConversation = async (conversationId, updates, token) => {
  try {
    const res = await axios.put(
      "http://localhost:8800/api/conversations/" + conversationId,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLastMessageFromConversation = async (conversationId, token) => {
  try {
    const res = await axios(
      "http://localhost:8800/api/messages/lastMessage/" + conversationId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postNewConversation = async (newConversation, token) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/conversations",
      newConversation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postNewMessage = async (newMessage, token) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/messages/",
      newMessage,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByToken = async (token) => {
  try {
    const res = await axios.get("http://localhost:8800/api/users/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

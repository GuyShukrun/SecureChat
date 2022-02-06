import axios from "axios";

export const loginCall = async (userCredentials) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/users/login",
      userCredentials
    );
    return res;
  } catch (error) {
    return error;
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
    return error;
  }
};

export const searchUserCall = async (userToSearch) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/users/search/" + userToSearch
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getUserConversations = async (userId) => {
  try {
    const res = await axios(
      "http://localhost:8800/api/conversations/" + userId
    );
    return res;
  } catch (error) {
    return error;
  }
};

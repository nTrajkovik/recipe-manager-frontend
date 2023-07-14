import axios from "axios";

const Api = () => {
  const token = localStorage.getItem("jwt");
  const client = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
      Authorization: token,
    },
  });

  return client;
};

export default Api;

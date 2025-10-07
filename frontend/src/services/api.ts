import axios from "axios";

export const api = axios.create({
  baseURL: "https://teste-logsup.onrender.com/api",
  withCredentials: true,
});

// http://localhost:3333/api
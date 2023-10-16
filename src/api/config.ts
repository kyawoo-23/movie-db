import axios, { AxiosError, AxiosResponse } from "axios";

// Create an instance of Axios with default configuration
export const MovieAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json",
  },
});

MovieAPI.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${import.meta.env.VITE_API_KEY}`;
    console.log("Config: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

MovieAPI.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Success:", response);
    return response;
  },
  (error: AxiosError) => {
    console.log("Error: ", error);
    return Promise.reject(error);
  }
);

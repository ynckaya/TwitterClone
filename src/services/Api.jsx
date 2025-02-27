import axios from "axios";

const API_URL = "API_URL";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  const response = await api.post("/users/signup", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const fetchTweets = async () => {
  const response = await api.get("/twits");
  return response.data.data;
};

export const postTweet = async (tweetData) => {
  const response = await api.post("/twits", tweetData, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data;
};

export const likeTweet = async (data) => {
  const response = await api.post(`/twits/${data.tweetId}/likes`,
    { user_id: String(data.userId) },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response.data;
};


export const deleteTweet = async (tweetId) => {
  const response = await api.delete(`/twits/${tweetId}`);
  return response.data;
};

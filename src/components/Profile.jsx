import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTweets } from "../hooks/useTweets";

const Profile = () => {
  const { user } = useAuth();
  const { tweets } = useTweets();

  const userTweets = tweets?.filter((tweet) => tweet.userId === user?.id);

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <h2 className="text-xl font-bold">{user?.nickname}'in twitleri</h2>
      {userTweets?.map((tweet) => (
        <div
          key={tweet.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-300"
        >
          <p className="text-gray-800">{tweet.content}</p>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>❤️ {tweet.likes}</span>
            <span>{new Date(tweet.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;

import React from "react";
import { useParams } from "react-router-dom";
import { useTweets } from "../hooks/useTweets";

const TweetDetail = () => {
  const { id } = useParams();
  const { tweets } = useTweets();
  const tweet = tweets?.find((t) => t.id === id);

  if (!tweet) return <p>Twit bulunamadı!</p>;

  return (
    <div className="max-w-2xl mx-auto mt-5 bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold">{tweet.userNickname}</h2>
      <p className="text-gray-800">{tweet.content}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>❤️ {tweet.likes}</span>
        <span>{new Date(tweet.createdAt).toLocaleString()}</span>
      </div>
      <h3 className="text-lg font-bold mt-4">Yorumlar</h3>
      {tweet.replies?.map((reply) => (
        <div key={reply.id} className="border-t pt-2 mt-2 text-gray-700">
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TweetDetail;

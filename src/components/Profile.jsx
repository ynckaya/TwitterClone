import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTweets } from "../hooks/useTweets";

const Profile = () => {
  const { user } = useAuth();
  const { nickname } = useParams();
  const { tweets, isLoading, error } = useTweets();

  // Eğer URL'de `nickname` varsa onu kullan, yoksa giriş yapan kullanıcının nickname'ini kullan
  const currentNickname = nickname || user?.nickname;
  console.log(currentNickname);

  if (!currentNickname) return <p>Kullanıcı bulunamadı!</p>;
  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu!</p>;


  const userTweets = tweets.filter((tweet) => tweet.nickname === currentNickname);

  return (
    <div className="max-w-lg mx-auto mt-5">
      <h2 className="text-xl font-bold mb-4">{currentNickname} adlı kullanıcının twitleri</h2>
      {userTweets.length === 0 ? (
        <p>Bu kullanıcı henüz hiç twit atmamış.</p>
      ) : (
        userTweets.map((tweet) => (
          <div key={tweet.id} className="max-w-lg rounded shadow-lg p-4 mb-4">
            <p>{tweet.content}</p>
            <div className="text-sm text-gray-500">{new Date(tweet.createdat).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;

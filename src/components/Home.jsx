import { useState } from "react";
import { useTweets } from "../hooks/useTweets";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const TWEETS_PER_PAGE = 5;

const Home = () => {
  const { user } = useAuth();
  const { tweets, isLoading, error, createTweet, like } = useTweets();

  const [visibleCount, setVisibleCount] = useState(TWEETS_PER_PAGE);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); 

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu!</p>;

  const onSubmit = (data) => {
    const newTwitData = {
      author_id: user.id,
      content: data.tweet,
      replyTo: null,
    };
    createTweet.mutate(newTwitData);
    reset();
  };

  const handleLike = (tweetId) => {
    if (!user) {
      toast.error("Beğenmek için giriş yapmalısınız!");
      return;
    }

    like.mutate({ tweetId, userId: user.id });
  };

  return (
    <div className="max-w-lg mx-auto mt-5">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          <textarea 
            {...register("tweet", { required: "Twit boş olamaz!" })}
            rows="4" 
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="write something..."/>
            {errors.tweet && <p className="text-red-500 text-sm mt-1">{errors.tweet.message}</p>}
          <button disabled={!!!user} type="submit" className="mt-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{user ? "Send" : "Lütfen giriş yapınız!"}</button>
      </form>
      <div className="mt-5">
        {tweets.slice(0, visibleCount).map((tweet) => (
          <div
            key={tweet.id}
            className="max-w-lg rounded overflow-hidden shadow-lg p-4 mb-4"
          >
            <p className="font-bold text-xl mb-2">
            <Link to={`/profile/${tweet.nickname}`} className="flex gap-2 pt-1">{tweet.nickname}</Link>
              </p>
            <p>{tweet.content}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
              <span>
                <button onClick={() => handleLike(tweet.id)} className="mr-2">
                  <FontAwesomeIcon icon={faHeart} className="text-base"/>
                </button>
                {tweet.likes}
              </span>
              <span>{new Date(tweet.createdat).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Daha Fazla Yükle Butonu */}
      {visibleCount < tweets.length && (
        <button
          onClick={() => setVisibleCount(visibleCount + TWEETS_PER_PAGE)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-700"
        >
          Daha Fazla Yükle
        </button>
      )}
    </div>
  );
};

export default Home;

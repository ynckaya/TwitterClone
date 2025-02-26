import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTweets, postTweet, likeTweet, deleteTweet } from "../services/api";

export const useTweets = () => {
  const queryClient = useQueryClient();

  const { data: tweets, error, isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
  });

  const createTweet = useMutation({
    mutationFn: postTweet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] }),
  });

  const like = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] }),
  });

  const deleteTwit = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] }),
  });

  return { tweets, error, isLoading, createTweet, like, deleteTwit };
};

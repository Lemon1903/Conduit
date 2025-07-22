import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { BASE_ARTICLE_KEY, USER_FEED_KEY } from "@/constants";
import { followUser, unfollowUser } from "@/lib/api";
import { getArticlesQueryOptions, getProfileQueryOptions } from "@/lib/options";
import { getErrorMessage } from "@/lib/utils";
import { userStore } from "@/stores/userStore";
import type { IArticle } from "@/types";
import type { AxiosError } from "axios";

type ArticleContext = { queryKey: Array<unknown>; previousData: IArticle };

function useFollowMutation(isFollowing: boolean) {
  const queryClient = useQueryClient();
  const { user } = userStore();

  return useMutation({
    mutationFn: (username: string) => {
      return isFollowing ? unfollowUser(username) : followUser(username);
    },
    onMutate: (username) => {
      const profileQueryOptions = getProfileQueryOptions(username);

      queryClient.cancelQueries({ queryKey: profileQueryOptions.queryKey });

      // Optimistically update the follow button in profile page
      const cachedProfile = queryClient.getQueryData(profileQueryOptions.queryKey);

      queryClient.setQueryData(profileQueryOptions.queryKey, (oldProfile) => {
        if (!oldProfile) return oldProfile;
        return {
          ...oldProfile,
          following: !isFollowing,
        };
      });

      // Optimistically update the follow button in article page
      const queries = queryClient.getQueryCache().findAll({ queryKey: [BASE_ARTICLE_KEY] });
      const context: Array<ArticleContext> = [];

      queries.forEach((query) => {
        const queryKey = query.queryKey;
        const cachedArticle = queryClient.getQueryData<IArticle>(queryKey);

        if (!cachedArticle) return;

        queryClient.setQueryData(queryKey, (oldArticle: IArticle) => {
          if (oldArticle.author.username !== username) return oldArticle;
          return { ...oldArticle, author: { ...oldArticle.author, following: !isFollowing } };
        });

        context.push({ queryKey: Array.from(queryKey), previousData: cachedArticle });
      });

      return () => {
        queryClient.setQueryData(profileQueryOptions.queryKey, cachedProfile);
        context.forEach(({ queryKey, previousData }) => {
          queryClient.setQueryData(queryKey, previousData);
        });
      };
    },
    onSuccess: (successMessage) => {
      toast.success(successMessage);
      // invalidate own feed to reflect follow/unfollow changes
      queryClient.invalidateQueries({
        queryKey: getArticlesQueryOptions(USER_FEED_KEY, user?.username).queryKey,
      });
    },
    onError: (error: AxiosError, _, rollback) => {
      toast.error(getErrorMessage(error));
      rollback?.();
    },
  });
}

export default useFollowMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { BASE_ARTICLES_KEY } from "@/constants";
import { favoriteArticle, unfavoriteArticle } from "@/lib/api";
import { getArticleQueryOptions } from "@/lib/options";
import { getTruncatedText } from "@/lib/utils";
import type { IArticle, IArticlesResponse } from "@/types";

type Context = Array<{ queryKey: Array<unknown>; previous: IArticlesResponse | IArticle }>;

function useFavoriteArticleMutation(article: IArticle) {
  const queryClient = useQueryClient();

  function getUpdatedArticle(article: IArticle) {
    return {
      ...article,
      favorited: !article.favorited,
      favorites_count: article.favorites_count + (article.favorited ? -1 : 1),
    };
  }

  // FIXME: FUCK OPTIMISTIC UPDATES!!!
  return useMutation({
    mutationFn: async () => {
      await (article.favorited ? unfavoriteArticle(article.slug) : favoriteArticle(article.slug));
    },
    onMutate: async () => {
      // Optimistic update on all feeds
      await queryClient.cancelQueries({ queryKey: [BASE_ARTICLES_KEY] });

      const context: Context = [];

      // Updating the single article cache
      const articleQueryOptions = getArticleQueryOptions(article.slug);
      const previousArticle = queryClient.getQueryData(articleQueryOptions.queryKey);

      queryClient.setQueryData(articleQueryOptions.queryKey, getUpdatedArticle(article));

      context.push({
        queryKey: Array.from(articleQueryOptions.queryKey),
        previous: previousArticle!,
      });

      // Updating the article feeds
      const previousQueries = queryClient
        .getQueryCache()
        .findAll({ queryKey: [BASE_ARTICLES_KEY] });

      previousQueries.forEach((query) => {
        const queryKey = query.queryKey;
        const previousArticles = queryClient.getQueryData<IArticlesResponse>(queryKey);

        if (!previousArticles) return;

        queryClient.setQueryData(queryKey, (oldArticles: IArticlesResponse) => {
          const updatedArticles = oldArticles.results.map((oldArticle) => {
            if (oldArticle.slug === article.slug) {
              return getUpdatedArticle(oldArticle);
            }
            return oldArticle;
          });
          return { ...oldArticles, results: updatedArticles };
        });

        context.push({ queryKey: Array.from(queryKey), previous: previousArticles });
      });

      return () => {
        context.forEach(({ queryKey, previous }) => {
          queryClient.setQueryData(queryKey, previous);
        });
      };
    },
    onError: (_, __, rollback) => {
      const displayTitle = getTruncatedText(article.title, 40);
      toast.error(
        `Failed to updated favorite status on article: "${displayTitle}". Please try again.`,
      );
      rollback?.();
    },
  });
}

export default useFavoriteArticleMutation;

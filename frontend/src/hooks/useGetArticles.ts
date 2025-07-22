import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { getArticlesQueryOptions } from "@/lib/options";
import type { IArticlesQueryParams } from "@/types";

function useGetArticles(feedType: string, username?: string | null, params?: IArticlesQueryParams) {
  const queryClient = useQueryClient();
  const { data: articles, status: articlesStatus, ...rest } = useQuery(
    getArticlesQueryOptions(feedType, username, {
      params,
      options: { enabled: username !== undefined },
    }),
  );

  useEffect(() => {
    if (articles?.next && params?.page) {
      queryClient.prefetchQuery(
        getArticlesQueryOptions(feedType, username, {
          params: { ...params, page: params.page + 1 },
        }),
      );
    }
  }, [articles, params, queryClient]);

  return { articles, articlesStatus, ...rest };
}

export default useGetArticles;

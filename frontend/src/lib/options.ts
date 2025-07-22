import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";

import {
  BASE_ARTICLE_KEY,
  BASE_ARTICLES_KEY,
  BASE_COMMENTS_KEY,
  BASE_PROFILE_KEY,
  BASE_TAGS_KEY,
  USER_FEED_KEY,
} from "@/constants";
import { getArticle, getArticles, getComments, getProfile, getTags } from "@/lib/api";
import type { IArticle, IArticlesQueryParams, IArticlesResponse, IAuthor, IComment } from "@/types";
import type { AxiosError } from "axios";

// Generic type for query options without "queryKey" and "queryFn"
type QueryOptionsWithoutKeyFn<T> = Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">;

interface GetArticlesQueryProps {
  params?: IArticlesQueryParams;
  options?: QueryOptionsWithoutKeyFn<IArticlesResponse>;
}

function getArticlesQueryOptions(
  feedType: string,
  username?: string | null,
  { params, options }: GetArticlesQueryProps = {},
) {
  const endpoint = feedType === USER_FEED_KEY ? "/articles/feed" : "/articles";
  const queryKey: Array<unknown> = [BASE_ARTICLES_KEY, feedType];

  if (username) {
    queryKey.push(username);
  }

  if (params) {
    queryKey.push(params);
  }

  return queryOptions({
    queryKey,
    queryFn: () => getArticles(params, endpoint),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    ...options,
  });
}

function getArticleQueryOptions(
  slug?: string,
  options?: QueryOptionsWithoutKeyFn<IArticle | null>,
) {
  return queryOptions<IArticle | null, AxiosError>({
    queryKey: [BASE_ARTICLE_KEY, slug],
    queryFn: () => getArticle(slug),
    staleTime: 1000 * 60 * 60, // 1 hour
    ...options,
  });
}

function getCommentsQueryOptions(
  slug: string,
  options?: QueryOptionsWithoutKeyFn<Array<IComment>>,
) {
  return queryOptions<Array<IComment>, AxiosError>({
    queryKey: [BASE_COMMENTS_KEY, slug],
    queryFn: () => getComments(slug),
    ...options,
  });
}

function getTagsQueryOptions() {
  return queryOptions<Array<string>, AxiosError>({
    queryKey: [BASE_TAGS_KEY],
    queryFn: () => getTags(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
}

function getProfileQueryOptions(username: string, options?: QueryOptionsWithoutKeyFn<IAuthor>) {
  return queryOptions<IAuthor, AxiosError>({
    queryKey: [BASE_PROFILE_KEY, username],
    queryFn: () => getProfile(username),
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

export {
  getArticleQueryOptions,
  getArticlesQueryOptions,
  getCommentsQueryOptions,
  getProfileQueryOptions,
  getTagsQueryOptions
};


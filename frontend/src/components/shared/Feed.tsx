import React from "react";

import ArticlePreview from "@/components/ArticlePreview";
import ArticlesSkeleton from "@/components/ArticlesSkeleton";
import NoResultsFound from "@/components/shared/NoResultsFound";
import PaginationControls from "@/components/shared/PaginationControls";
import ServerError from "@/components/shared/ServerError";
import { ARTICLES_PER_PAGE, MAX_PAGINATION_LIMIT, MIN_PAGINATION_LIMIT } from "@/constants";
import useGetArticles from "@/hooks/useGetArticles";
import usePersistedPage from "@/hooks/usePersistedPage";
import type { IArticlesQueryParams } from "@/types";

interface FeedProps {
  feedType: string;
  username?: string | null;
  params?: Omit<IArticlesQueryParams, "page">;
  noResultsFoundMessage?: string;
}

function Feed({ feedType, username, params, noResultsFoundMessage }: FeedProps) {
  const [persistedPage, onPageChange] = usePersistedPage(
    feedType + (username ? `-${username}` : "") + (params?.tag ? `-${params.tag}` : ""),
  );
  const { articles, articlesStatus, error, refetch } = useGetArticles(feedType, username, {
    ...params,
    page: persistedPage,
  });

  if (articlesStatus === "pending") {
    return <ArticlesSkeleton />;
  }

  if (error) {
    if (error.status === 404) {
      return <NoResultsFound onPageChange={onPageChange} />;
    }
    return <ServerError retry={refetch} />;
  }

  if (articles!.count === 0) {
    return <NoResultsFound message={noResultsFoundMessage} />;
  }

  return (
    <React.Fragment>
      {articles!.results.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      <PaginationControls
        currentPage={persistedPage}
        maxPaginationLimit={MAX_PAGINATION_LIMIT}
        minPaginationLimit={MIN_PAGINATION_LIMIT}
        maxPagination={Math.ceil(articles!.count / ARTICLES_PER_PAGE)}
        onPageClick={onPageChange}
      />
    </React.Fragment>
  );
}

export default Feed;

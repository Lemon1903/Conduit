import { useQuery } from "@tanstack/react-query";

import { getArticleQueryOptions } from "@/lib/options";

function useGetArticle(slug?: string) {
  // prettier-ignore
  const { data, status: articleStatus, ...rest } = useQuery(
    getArticleQueryOptions(slug, { enabled: !!slug }),
  );

  return { article: data, articleStatus, ...rest };
}

export default useGetArticle;

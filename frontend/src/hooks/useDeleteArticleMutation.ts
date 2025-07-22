import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteArticle } from "@/lib/api";

function useDeleteArticleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onMutate: (slug) => {
      // // Optimistically update the UI
      // console.log("Optimistically deleting article:", slug);
      // queryClient.cancelQueries({ queryKey: [BASE_ARTICLES_KEY] });

      // const context: Array<{ queryKey: Array<unknown>; previousArticles: IArticlesResponse }> = [];

      // const queries = queryClient.getQueryCache().findAll({ queryKey: [BASE_ARTICLES_KEY] });
      // queries.forEach((query) => {
      //   const queryKey = query.queryKey;
      //   const previousArticles = queryClient.getQueryData<IArticlesResponse>(queryKey);

      //   if (!previousArticles) return;

      //   queryClient.setQueryData(queryKey, (oldArticles: IArticlesResponse) => ({
      //     ...oldArticles,
      //     results: oldArticles.results.filter((article) => article.slug !== slug),
      //   }));

      //   context.push({ queryKey: Array.from(queryKey), previousArticles });
      // });

      // return () => {
      //   context.forEach(({ queryKey, previousArticles }) => {
      //     queryClient.setQueryData(queryKey, previousArticles);
      //   });
      // };
    },
    onError: (_, __, rollback) => {
      // rollback?.();
    },
  });
}

export default useDeleteArticleMutation;

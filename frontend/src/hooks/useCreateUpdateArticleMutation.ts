import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod/v4";

import { BASE_ARTICLES_KEY, BASE_TAGS_KEY } from "@/constants";
import { createArticle, updateArticle } from "@/lib/api";
import { getArticleQueryOptions } from "@/lib/options";
import articleSchema from "@/schemas/articleSchema";

function useCreateUpdateArticleMutation(slug?: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: z.infer<typeof articleSchema>) => {
      return slug ? updateArticle(slug, values) : createArticle(values);
    },
    onMutate: (values) => {
      const articleQueryOptions = getArticleQueryOptions(slug);
      queryClient.cancelQueries(articleQueryOptions);

      const previousArticle = queryClient.getQueryData(articleQueryOptions.queryKey);

      queryClient.setQueryData(articleQueryOptions.queryKey, (old) => {
        if (!old) return old;
        return { ...old, ...values };
      });

      return () => {
        queryClient.setQueryData(articleQueryOptions.queryKey, previousArticle);
      };
    },
    onSuccess: async (article) => {
      await queryClient.invalidateQueries({ queryKey: [BASE_ARTICLES_KEY] });
      await queryClient.invalidateQueries({ queryKey: [BASE_TAGS_KEY] });
      toast.success(`Article ${slug ? "updated" : "created"} successfully!`);
      navigate(`/article/${article.slug}`);
    },
    onError: (_, __, rollback) => {
      toast.error("Failed to create article.");
      rollback?.();
    },
  });
}

export default useCreateUpdateArticleMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createComment, editComment } from "@/lib/api";
import { getCommentsQueryOptions } from "@/lib/options";
import { getErrorMessage } from "@/lib/utils";

function useCreateUpdateCommentMutation(slug: string, id?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) => {
      return id ? editComment(slug, id, body) : createComment(slug, body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(getCommentsQueryOptions(slug));
    },
    onError: (error) => {
      toast.error(`Failed to ${id ? "update" : "create"} comment: ${getErrorMessage(error)}}`);
    },
  });
}

export default useCreateUpdateCommentMutation;

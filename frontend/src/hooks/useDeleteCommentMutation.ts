import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/lib/api";
import { getCommentsQueryOptions } from "@/lib/options";

function useDeleteCommentMutation(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComment(slug, id),
    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsQueryOptions(slug));
    },
  });
}

export default useDeleteCommentMutation;

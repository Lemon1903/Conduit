import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import { ActionButton } from "@/components/ui/action-button";
import { BASE_ARTICLES_KEY } from "@/constants";
import { deleteArticle } from "@/lib/api";
import { getTruncatedText } from "@/lib/utils";
import type { IArticle } from "@/types";

function DeleteArticleButton({ article }: { article: IArticle }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleDelete() {
    try {
      await deleteArticle(article.slug);
      await queryClient.invalidateQueries({ queryKey: [BASE_ARTICLES_KEY] });
      navigate(location.state?.from || "/");
      return {
        error: false,
        message: "Article deleted successfully",
      };
    } catch {
      const displayTitle = getTruncatedText(article!.title, 40);
      return {
        error: true,
        message: `Failed to delete article: "${displayTitle}". Please try again.`,
      };
    }
  }

  return (
    <ActionButton
      action={handleDelete}
      size="sm"
      variant="outline"
      className="!border-destructive !text-destructive hover:!bg-destructive"
      requireAreYouSure
      areYouSureDescription="Are you sure you want to delete this article?"
    >
      <Trash2 fill="currentColor" className="size-3.5" />
      Delete Article
    </ActionButton>
  );
}

export default DeleteArticleButton;

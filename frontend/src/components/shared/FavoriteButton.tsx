import { Heart } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import useFavoriteArticleMutation from "@/hooks/useFavoriteArticleMutation";
import { cn } from "@/lib/utils";
import { userStore } from "@/stores/userStore";
import type { IArticle } from "@/types";

interface FavoriteButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  article: IArticle;
  showTitle?: boolean;
}

function FavoriteButton({ article, showTitle = false, className, ...props }: FavoriteButtonProps) {
  const { user } = userStore();
  const navigate = useNavigate();
  const location = useLocation();
  const favoriteMutation = useFavoriteArticleMutation(article);

  function handleFavoriteClick() {
    if (!user) {
      navigate("/login", { state: { path: location.pathname } });
      return;
    }
    favoriteMutation.mutate();
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        "!border-primary !text-primary hover:!bg-primary",
        article.favorited && "!bg-primary !text-white",
        className,
      )}
      disabled={user?.username === article.author.username}
      onClick={handleFavoriteClick}
      {...props}
    >
      <Heart fill="currentColor" className="size-3.5" />
      {showTitle && (article.favorited ? "Unfavorite" : "Favorite") + " Post "}
      <span className={cn(showTitle && "counter")}>
        {showTitle ? `(${article.favorites_count})` : article.favorites_count}
      </span>
    </Button>
  );
}

export default FavoriteButton;

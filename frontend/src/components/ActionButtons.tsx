import { Pencil } from "lucide-react";
import React from "react";
import { Link } from "react-router";

import DeleteArticleButton from "@/components/DeleteArticleButton";
import FavoriteButton from "@/components/shared/FavoriteButton";
import FollowButton from "@/components/shared/FollowButton";
import { Button } from "@/components/ui/button";
import { userStore } from "@/stores/userStore";
import type { IArticle } from "@/types";

function ActionButtons({ article }: { article: IArticle }) {
  const { user } = userStore();

  return (
    <div className="flex items-center gap-2">
      {user?.username === article.author.username ? (
        <React.Fragment>
          <Button size="sm" variant="outline" asChild>
            <Link to={`/editor/${article.slug}`} className="!text-inherit">
              <Pencil fill="currentColor" className="size-3.5" />
              Edit Article
            </Link>
          </Button>
          <DeleteArticleButton article={article} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FollowButton username={article.author.username} isFollowing={article.author.following} />
          <FavoriteButton article={article} showTitle />
        </React.Fragment>
      )}
    </div>
  );
}

export default ActionButtons;

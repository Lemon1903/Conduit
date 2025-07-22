import { Link, useLocation } from "react-router";

import AuthorMeta from "@/components/shared/AuthorMeta";
import FavoriteButton from "@/components/shared/FavoriteButton";
import TagList from "@/components/shared/TagList";
import type { IArticle } from "@/types";

interface ArticleProps {
  article: IArticle;
}

function ArticlePreview({ article }: ArticleProps) {
  const location = useLocation();

  return (
    <div className="article-preview">
      <div className="article-meta">
        <AuthorMeta author={article.author} created_at={article.created_at} />
        <FavoriteButton article={article} className="float-right" />
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        state={{ from: location.pathname }}
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tags={article.tags} />
      </Link>
    </div>
  );
}

export default ArticlePreview;

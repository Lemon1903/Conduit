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
        <div className="grid grid-cols-[1fr_2fr]">
          <span className="!max-w-none">Read more...</span>
          <TagList
            tags={article.tags}
            shouldTruncate
            classNames={{
              container: "!mb-0 !flex overflow-hidden",
              tag: "max-w-9/12 text-ellipsis first:ml-auto",
            }}
          />
        </div>
      </Link>
    </div>
  );
}

export default ArticlePreview;

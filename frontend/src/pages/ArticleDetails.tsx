import { useParams } from "react-router";

import ActionButtons from "@/components/ActionButtons";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { RichTextEditor } from "@/components/blocks/editor-00/editor";
import CommentsSection from "@/components/CommentsSection";
import AuthorMeta from "@/components/shared/AuthorMeta";
import NoResultsFound from "@/components/shared/NoResultsFound";
import ServerError from "@/components/shared/ServerError";
import TagList from "@/components/shared/TagList";
import useGetArticle from "@/hooks/useGetArticle";

function ArticleDetails() {
  const { slug } = useParams();

  const { article, articleStatus, error, refetch } = useGetArticle(slug);

  if (articleStatus === "pending") {
    return <ArticleSkeleton />;
  }

  if (error) {
    return <ServerError retry={refetch} />;
  }

  if (!article) {
    return <NoResultsFound message="Article not found" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1 className="!text-[2rem] [text-wrap:pretty] md:!text-[2.8rem]">{article.title}</h1>
          <div className="article-meta !flex flex-wrap gap-y-2.5">
            <AuthorMeta author={article.author} created_at={article.created_at} />
            <ActionButtons article={article} />
          </div>
        </div>
      </div>

      <div className="page container">
        <div className="row article-content">
          <div className="col-md-12 px-4">
            <p>{article.description}</p>
            <RichTextEditor editorSerializedState={JSON.parse(article.body)} editable={false} />
            <TagList tags={article.tags} />
          </div>
        </div>
        <hr />
        <div className="article-actions max-md:!mb-[1.5rem]">
          <div className="article-meta !flex flex-wrap justify-center gap-y-2">
            <AuthorMeta author={article.author} created_at={article.created_at} />
            <ActionButtons article={article} />
          </div>
        </div>
        <CommentsSection />
      </div>
    </div>
  );
}

export default ArticleDetails;

import Feed from "@/components/shared/Feed";
import { TAG_FEED_KEY } from "@/constants";

function TagFeed({ tag }: { tag: string }) {
  return (
    <Feed
      feedType={TAG_FEED_KEY}
      username={null}
      params={{ tag: tag ?? undefined }}
      noResultsFoundMessage={`No articles found for tag: ${tag}`}
    />
  );
}

export default TagFeed;

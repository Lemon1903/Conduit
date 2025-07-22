import Feed from "@/components/shared/Feed";
import { HOME_FEED_KEY } from "@/constants";

function GlobalFeed() {
  return (
    <Feed feedType={HOME_FEED_KEY} username={null} noResultsFoundMessage="No articles found" />
  );
}

export default GlobalFeed;

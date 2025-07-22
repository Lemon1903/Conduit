import { useOutletContext } from "react-router";

import Feed from "@/components/shared/Feed";
import { FAVORITES_FEED_KEY } from "@/constants";
import { userStore } from "@/stores/userStore";

function FavoritedArticles() {
  const { user } = userStore();
  const username = useOutletContext<string | undefined>();

  const errorPrefix = user?.username === username ? "You haven't" : `${username} hasn't`;

  return (
    <Feed
      feedType={FAVORITES_FEED_KEY}
      username={username}
      params={{ favorited: username }}
      noResultsFoundMessage={`${errorPrefix} favorited any articles.`}
    />
  );
}

export default FavoritedArticles;

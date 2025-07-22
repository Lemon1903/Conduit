import { useOutletContext } from "react-router";

import Feed from "@/components/shared/Feed";
import { PROFILE_FEED_KEY } from "@/constants";
import { userStore } from "@/stores/userStore";

function UserArticles() {
  const { user } = userStore();
  const username = useOutletContext<string | undefined>();

  const errorPrefix = user?.username === username ? "You haven't" : `${username} hasn't`;

  return (
    <Feed
      feedType={PROFILE_FEED_KEY}
      username={username}
      params={{ author: username }}
      noResultsFoundMessage={`${errorPrefix} written any articles yet.`}
    />
  );
}

export default UserArticles;

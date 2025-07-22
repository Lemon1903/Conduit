import Feed from "@/components/shared/Feed";
import { USER_FEED_KEY } from "@/constants";
import { userStore } from "@/stores/userStore";

function UserFeed() {
  const { user } = userStore();

  return (
    <Feed
      feedType={USER_FEED_KEY}
      username={user!.username}
      noResultsFoundMessage="You haven't followed any authors yet. Follow others to see their articles here!"
    />
  );
}

export default UserFeed;

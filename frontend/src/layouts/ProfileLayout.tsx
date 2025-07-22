import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Link, Navigate, NavLink, Outlet, useParams } from "react-router";

import FollowButton from "@/components/shared/FollowButton";
import ServerError from "@/components/shared/ServerError";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileQueryOptions } from "@/lib/options";
import { cn, getImageUrl } from "@/lib/utils";
import { userStore } from "@/stores/userStore";

const links = [
  { name: "My Articles", path: "" },
  { name: "Favorited Articles", path: "favorites" },
];

function ProfileLayout() {
  const { username } = useParams();
  const { user } = userStore();

  // Check if the profile being viewed is the current user's profile
  const isOwnProfile = user && user.username === username;

  // prettier-ignore
  const { data: profile, isLoading, error, refetch } = useQuery(
    getProfileQueryOptions(username!, {
      enabled: !isOwnProfile,
    }),
  );

  // Use user data for own profile, otherwise use fetched profile data
  const displayProfile = isOwnProfile ? { ...user, following: false } : profile;

  if (error) {
    if ((error as AxiosError).status === 404) {
      return <Navigate to="/not-found" replace />;
    }
    return <ServerError retry={refetch} />;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="grid place-items-center">
                {!isOwnProfile && isLoading ? (
                  <Skeleton className="user-img" />
                ) : (
                  <img
                    src={getImageUrl(displayProfile?.image)}
                    className="user-img object-cover object-top"
                  />
                )}
              </div>
              {!isOwnProfile && isLoading ? (
                <Skeleton className="mx-auto h-7 w-48" />
              ) : (
                <h4>{displayProfile?.username}</h4>
              )}
              {displayProfile?.bio && <p>{displayProfile.bio}</p>}
              <div className="flex justify-end gap-2">
                {user && displayProfile && user.username !== displayProfile.username && (
                  <FollowButton
                    username={displayProfile.username}
                    isFollowing={displayProfile.following}
                  />
                )}
                {isOwnProfile && (
                  <Button asChild size="sm" variant="outline" className="action-btn">
                    <Link to="/settings">
                      <i className="ion-gear-a"></i>
                      &nbsp; Edit Profile Settings
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                {links.map((link) => (
                  <li className="nav-item" key={link.name}>
                    <NavLink
                      to={`/profile/${username}` + (link.path ? `/${link.path}` : "")}
                      end={link.path === ""}
                      className={({ isActive }) => cn("nav-link", isActive && "active")}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <Outlet context={displayProfile?.username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;

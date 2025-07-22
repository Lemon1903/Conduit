import React from "react";
import { Link, NavLink } from "react-router";

import ProfilePicture from "@/components/shared/ProfilePicture";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { userStore } from "@/stores/userStore";
import type { INavigationLink } from "@/types";

const links: INavigationLink[] = [
  { name: "Home", path: "/", visibility: "public" },
  { name: "Sign in", path: "/login", visibility: "guest" },
  { name: "Sign up", path: "/register", visibility: "guest" },
  { name: "New Article", path: "/editor", visibility: "user", icon: "ion-compose" },
  { name: "Settings", path: "/settings", visibility: "user", icon: "ion-gear-a" },
  { name: "Profile", path: "/profile", visibility: "user" },
];

function Header() {
  const { user, isAuthInitialized } = userStore();

  const isAuthenticated = !!user;
  const visibleLinks = links.filter((link) => {
    switch (link.visibility) {
      case "public":
        return true;
      case "guest":
        return !isAuthenticated;
      case "user":
        return isAuthenticated;
    }
  });

  function getFullPath(path: string) {
    if (isAuthenticated && path == "/profile") {
      return path + "/" + user.username;
    }
    return path;
  }

  return (
    <nav className="navbar navbar-light">
      <div className="container flex items-center justify-between">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right my-auto">
          {visibleLinks.map((link) => (
            <li key={link.path} className="nav-item">
              {!isAuthInitialized ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <NavLink
                  to={getFullPath(link.path)}
                  end
                  className={({ isActive }) => cn("nav-link", isActive && "active")}
                >
                  <div className="flex items-center gap-1.5">
                    {link.path === "/profile" && isAuthenticated ? (
                      <React.Fragment>
                        <ProfilePicture
                          imageUrl={user.image}
                          alt={user.username}
                          className="size-6"
                        />
                        <span>{user.username}</span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {link.icon && <i className={`${link.icon} `} />}
                        <span>{link.name}</span>
                      </React.Fragment>
                    )}
                  </div>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

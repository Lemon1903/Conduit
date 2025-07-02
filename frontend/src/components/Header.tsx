import React from "react";
import { NavLink } from "react-router";

import { DEFAULT_IMAGE_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { userStore } from "@/stores/userStore";

type Link = {
  name: string;
  path: string;
  visibility: "public" | "guest" | "user";
  icon: string | null;
};

const links: Link[] = [
  { name: "Home", path: "/", visibility: "public", icon: null },
  { name: "Sign in", path: "/login", visibility: "guest", icon: null },
  { name: "Sign up", path: "/register", visibility: "guest", icon: null },
  { name: "New Article", path: "/editor", visibility: "user", icon: "ion-compose" },
  { name: "Settings", path: "/settings", visibility: "user", icon: "ion-gear-a" },
  { name: "Profile", path: "/profile", visibility: "user", icon: null },
];

function Header() {
  const { user } = userStore();
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
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          {visibleLinks.map((link) => (
            <li key={link.path} className="nav-item">
              <NavLink
                to={getFullPath(link.path)}
                className={({ isActive }) => cn("nav-link", isActive && "active")}
              >
                <div className="flex items-center gap-1.5">
                  {link.path === "/profile" && isAuthenticated ? (
                    <React.Fragment>
                      <div className="size-6 overflow-hidden rounded-full">
                        <img src={DEFAULT_IMAGE_URL} alt={user.username} />
                      </div>
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
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

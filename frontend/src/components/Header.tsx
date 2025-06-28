import { useLocation } from "react-router";

import { cn } from "@/lib/utils";
import React from "react";

type Link = {
  name: string;
  path: string;
  visibility: "public" | "guest" | "user";
  icon: string | null;
};

type User = {
  username: string;
  email: string;
  image: string;
};

const links: Link[] = [
  { name: "Home", path: "/", visibility: "public", icon: null },
  { name: "Sign in", path: "/login", visibility: "guest", icon: null },
  { name: "Sign up", path: "/register", visibility: "guest", icon: null },
  { name: "New Article", path: "/editor", visibility: "user", icon: "ion-compose" },
  { name: "Settings", path: "/settings", visibility: "user", icon: "ion-gear-a" },
  { name: "Profile", path: "/profile", visibility: "user", icon: null },
];

// debugging
function getCurrentUser(): User | null {
  // return {
  //   username: "johndoe",
  //   email: "john@example.com",
  //   image: "https://static.productionready.io/images/smiley-cyrus.jpg",
  // };
  return null;
}

function Header() {
  const location = useLocation();

  const user = getCurrentUser();
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

  function isActive(path: string) {
    const pathname = "/" + location.pathname.split("/")[1];
    return pathname === path;
  }

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
              <a
                className={cn("nav-link", isActive(link.path) && "active")}
                href={getFullPath(link.path)}
              >
                <div className="flex items-center gap-1.5">
                  {link.path === "/profile" && isAuthenticated ? (
                    <React.Fragment>
                      <div className="size-6 overflow-hidden rounded-full">
                        <img src={user.image} alt={user.username} />
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

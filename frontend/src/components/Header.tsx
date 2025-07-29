import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router";

import ProfilePicture from "@/components/shared/ProfilePicture";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { userStore } from "@/stores/userStore";
import type { INavigationLink } from "@/types";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

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

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    // If focus moves outside the menu container, close the menu
    if (!menuContainerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  }

  return (
    <nav className="navbar navbar-light relative">
      <div className="container flex items-center justify-between">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <div className="relative" ref={menuContainerRef} tabIndex={-1} onBlur={handleBlur}>
          <Button
            size="icon"
            variant="ghost"
            className="md:!hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <ul
            className={cn(
              "nav navbar-nav pull-xs-right max-md:bg-background my-auto max-md:absolute max-md:hidden",
              isOpen &&
                "z-50 max-md:top-full max-md:right-0 max-md:grid max-md:w-36 max-md:rounded-xs max-md:border max-md:border-black/10 max-md:py-[0.425rem] max-md:shadow-md",
            )}
          >
            {visibleLinks.map((link) => (
              <li key={link.path} className="nav-item max-md:!ml-0 max-md:px-1">
                {!isAuthInitialized ? (
                  <Skeleton className="h-4 w-20" />
                ) : (
                  <NavLink
                    to={getFullPath(link.path)}
                    end
                    className={({ isActive }) => cn("nav-link", isActive && "active")}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-1.5 max-md:px-4">
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
      </div>
    </nav>
  );
}

export default Header;

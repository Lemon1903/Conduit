import { NavLink, Outlet, useSearchParams } from "react-router";

import TagsSidebar from "@/components/TagsSidebar";
import { cn } from "@/lib/utils";
import { TagFeed } from "@/pages";
import { userStore } from "@/stores/userStore";
import type { INavigationLink } from "@/types";

const links: INavigationLink[] = [
  { name: "Your Feed", path: "feed", visibility: "user" },
  { name: "Global Feed", path: "", visibility: "public" },
];

function HomeLayout() {
  const { user } = userStore();
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag");

  const visibleLinks = links.filter((link) => {
    switch (link.visibility) {
      case "public":
        return true;
      case "user":
        return !!user;
    }
  });

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="page container">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active !flex">
                {visibleLinks.map((link) => (
                  <li className="nav-item !float-none" key={link.name}>
                    <NavLink
                      to={`/${link.path}`}
                      end={link.path === ""}
                      className={({ isActive }) =>
                        cn("nav-link", !tagParam && isActive && "active")
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {tagParam && (
                  <li className="nav-item">
                    <NavLink
                      to={`?tag=${tagParam}`}
                      className={({ isActive }) => cn("nav-link", isActive && "active")}
                    >
                      #{tagParam}
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            {tagParam ? <TagFeed tag={tagParam} /> : <Outlet />}
          </div>

          <TagsSidebar />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;

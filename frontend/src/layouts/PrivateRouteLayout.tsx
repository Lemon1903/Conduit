import { Navigate, Outlet, useLocation } from "react-router";

import { userStore } from "@/stores/userStore";

function PrivateRouteLayout() {
  const { user } = userStore();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        // FIXME: Still having problem when the user logs out and back in. Right now, it's working fine in most cases except one. 
        // Current problem:
        // - It works fine when user is signed in, logged out and logged in again, they are redirected to the home page, but
        //   when user is not signed in at first and access settings page, it goes to home page after login, which should be settings page.
        state={{ path: location.pathname !== "/settings" ? location.pathname : "/" }}
      />
    );
  }

  return <Outlet />;
}

export default PrivateRouteLayout;

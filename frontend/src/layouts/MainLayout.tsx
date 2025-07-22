import { Outlet } from "react-router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Spinner from "@/components/ui/spinner";
import { userStore } from "@/stores/userStore";

function MainLayout() {
  const { isAuthInitialized } = userStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        {!isAuthInitialized ? (
          <div className="absolute inset-0 flex items-center justify-center pb-4">
            <Spinner strokeWidth={3} />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;

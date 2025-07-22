import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { Toaster } from "@/components/ui/sonner";
import { HomeLayout, MainLayout, PrivateRouteLayout, ProfileLayout } from "@/layouts";
import {
  ArticleDetails,
  Editor,
  FavoritedArticles,
  GlobalFeed,
  Login,
  NotFound,
  Register,
  Settings,
  UserArticles,
  UserFeed,
} from "@/pages";

import { getUser } from "@/lib/api";
import { clearAccessToken, refreshAccessToken, setAccessToken } from "@/lib/auth";
import { userStore } from "@/stores/userStore";

function App() {
  const { setUser, clearUser, setIsAuthInitialized } = userStore();

  // Silent Login
  useEffect(() => {
    async function initSession() {
      try {
        const newToken = await refreshAccessToken();
        setAccessToken(newToken);
        const user = await getUser();
        setUser(user);
      } catch (error) {
        clearAccessToken();
        clearUser();
      } finally {
        setIsAuthInitialized(true);
      }
    }

    initSession();
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeLayout />}>
              <Route element={<PrivateRouteLayout />}>
                <Route path="feed" element={<UserFeed />} />
              </Route>
              <Route path="" element={<GlobalFeed />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRouteLayout />}>
              <Route path="/editor" element={<Editor />} />
              <Route path="/editor/:slug" element={<Editor />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/profile/:username" element={<ProfileLayout />}>
              <Route path="" element={<UserArticles />} />
              <Route path="favorites" element={<FavoritedArticles />} />
            </Route>
            <Route path="/article/:slug" element={<ArticleDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </React.Fragment>
  );
}

export default App;

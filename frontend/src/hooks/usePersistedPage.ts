import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { PAGE_PARAM_NAME } from "@/constants";
import { pageStore } from "@/stores/pageStore";

function usePersistedPage(feedKey: string) {
  const { getFeedPage, setFeedPage } = pageStore();
  const persistedPage = getFeedPage(feedKey);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (persistedPage === 1) return;
    const params = getSearchParams(persistedPage);
    setSearchParams(params, { replace: true });
  }, []);

  function onPageChange(page: number) {
    setFeedPage(feedKey, page);
    const params = getSearchParams(page);
    navigate(`?${params.toString()}`, { replace: true });
  }

  function getSearchParams(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM_NAME, page.toString());
    return params;
  }

  return [persistedPage, onPageChange] as const;
}

export default usePersistedPage;

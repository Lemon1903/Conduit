import { PAGE_PARAM_NAME } from "@/constants";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

function useCurrentPage(initialPage = 1) {
  const [searchParams] = useSearchParams({ [PAGE_PARAM_NAME]: initialPage.toString() });
  const navigate = useNavigate();

  const pageParam = parseInt(searchParams.get(PAGE_PARAM_NAME) || "1");
  const validPage = isPageValid() ? pageParam : 1;

  useEffect(() => {
    if (!isPageValid()) {
      const params = new URLSearchParams(searchParams);
      params.set(PAGE_PARAM_NAME, "1");
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [pageParam, searchParams, navigate, isPageValid]);

  function isPageValid() {
    return !isNaN(pageParam) && pageParam > 0;
  }

  function getPageUrl(page: number): string {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM_NAME, page.toString());
    return `?${params.toString()}`;
  }

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM_NAME, page.toString());
    navigate(`?${params.toString()}`, { replace: true });
  }

  return [validPage, getPageUrl, setPage] as const;
}

export default useCurrentPage;

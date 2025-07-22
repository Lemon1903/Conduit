import DynamicSkeleton from "@/components/shared/DynamicSkeleton";
import Tag from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { getTagsQueryOptions } from "@/lib/options";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useSearchParams } from "react-router";

function TagsSidebar() {
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag");

  const { data: tags, status, refetch } = useQuery(getTagsQueryOptions());

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {status === "pending" ? (
            Array.from({ length: 5 }, (_, idx) => (
              <DynamicSkeleton
                key={idx}
                baseWidth={64}
                additionalWidth={20}
                className="mr-1 inline-block"
              />
            ))
          ) : status === "error" ? (
            <div className="my-2 text-center">
              <p className="!mb-2">Failed to load tags</p>
              <Button className="gap-4" onClick={() => refetch()}>
                <RefreshCcw />
                Try Again
              </Button>
            </div>
          ) : tags.length > 0 ? (
            tags
              .slice(0, 10)
              .map((tag) => (
                <Tag key={tag} tag={tag} className={cn(tagParam === tag && "!bg-[#687077]")} />
              ))
          ) : (
            <div className="text-muted">No tags available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TagsSidebar;

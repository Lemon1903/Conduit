import DynamicSkeleton from "@/components/shared/DynamicSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ARTICLES_PER_PAGE } from "@/constants";
import { Heart } from "lucide-react";

const BASE_USERNAME_WIDTH = 80;
const ADDITIONAL_USERNAME_WIDTH = 20;

const BASE_DATE_WIDTH = 96;
const ADDITIONAL_DATE_WIDTH = 16;

const BASE_TITLE_WIDTH = 300;
const ADDITIONAL_TITLE_WIDTH = 200;

const BASE_DESCRIPTION_WIDTH = 672;
const ADDITIONAL_DESCRIPTION_WIDTH = 150;

function ArticlesSkeleton() {
  return Array.from({ length: ARTICLES_PER_PAGE }, (_, idx) => (
    <div key={idx} className="article-preview">
      <div className="mb-4 flex items-center">
        <Skeleton className="size-8 rounded-full" />
        <div className="mr-6 ml-1 space-y-0.5">
          <DynamicSkeleton
            baseWidth={BASE_USERNAME_WIDTH}
            additionalWidth={ADDITIONAL_USERNAME_WIDTH}
            className="h-4"
          />
          <DynamicSkeleton
            baseWidth={BASE_DATE_WIDTH}
            additionalWidth={ADDITIONAL_DATE_WIDTH}
            className="h-3"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="!border-primary text-primary hover:!bg-primary !ml-auto"
        >
          <Heart fill="currentColor" className="size-3.5" />
          <Skeleton className="size-5" />
        </Button>
      </div>
      <div>
        <DynamicSkeleton
          baseWidth={BASE_TITLE_WIDTH}
          additionalWidth={ADDITIONAL_TITLE_WIDTH}
          className="mb-1 h-6"
        />
        <DynamicSkeleton
          baseWidth={BASE_DESCRIPTION_WIDTH}
          additionalWidth={ADDITIONAL_DESCRIPTION_WIDTH}
          className="mb-4 h-4"
        />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <ul className="tag-list !mb-0 !flex items-center space-x-1">
            {Array.from({ length: 2 }, (_, idx) => (
              <DynamicSkeleton key={idx} baseWidth={64} additionalWidth={20} className="h-5" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  ));
}

export default ArticlesSkeleton;

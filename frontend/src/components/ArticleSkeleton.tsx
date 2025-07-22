import DynamicSkeleton from "@/components/shared/DynamicSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const BASE_TITLE_WIDTH = 700;
const ADDITIONAL_TITLE_WIDTH = 100;

const BASE_USERNAME_WIDTH = 80;
const ADDITIONAL_USERNAME_WIDTH = 20;

const BASE_DATE_WIDTH = 96;
const ADDITIONAL_DATE_WIDTH = 16;

const BASE_DESCRIPTION_WIDTH = 672;
const ADDITIONAL_DESCRIPTION_WIDTH = 150;

const BASE_BODY_WIDTH = "95%";
const ADDITIONAL_BODY_WIDTH = "5%";

function ArticleSkeleton() {
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <DynamicSkeleton
            baseWidth={BASE_TITLE_WIDTH}
            additionalWidth={ADDITIONAL_TITLE_WIDTH}
            className="mb-8 h-12"
          />
          <div className="mb-4 inline-flex items-center">
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
          </div>
          <div className="inline-flex">
            {Array.from({ length: 2 }, (_, idx) => (
              <Skeleton key={idx} className="mr-2 h-7 w-32" />
            ))}
          </div>
        </div>
      </div>

      <div className="page container">
        <div className="row article-content">
          <div className="max-w-full flex-1 px-4">
            <div className="mb-8">
              <DynamicSkeleton
                baseWidth={BASE_DESCRIPTION_WIDTH}
                additionalWidth={ADDITIONAL_DESCRIPTION_WIDTH}
                className="mb-8 h-7"
              />
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, idx) => (
                  <div key={idx} className="space-y-1">
                    {Array.from({ length: 5 }, (_, idx2) => (
                      <DynamicSkeleton
                        key={idx2}
                        baseWidth={BASE_BODY_WIDTH}
                        additionalWidth={ADDITIONAL_BODY_WIDTH}
                        className="h-7"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <ul className="tag-list !mb-0 !flex items-center space-x-1">
              {Array.from({ length: 3 }, (_, idx) => (
                <DynamicSkeleton key={idx} baseWidth={64} additionalWidth={20} className="h-5" />
              ))}
            </ul>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <div className="inline-flex items-center">
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
            </div>
            <div className="inline-flex">
              {Array.from({ length: 2 }, (_, idx) => (
                <Skeleton key={idx} className="mr-2 h-7 w-32" />
              ))}
            </div>
          </div>
        </div>

        <Skeleton className="mx-auto h-40 w-full md:w-2xl lg:w-3xl" />
      </div>
    </div>
  );
}

export default ArticleSkeleton;

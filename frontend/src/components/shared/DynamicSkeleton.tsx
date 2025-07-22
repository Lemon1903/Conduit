import { useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DynamicSkeletonProps {
  baseWidth: number | string;
  additionalWidth: number | string;
  className?: string;
}

function DynamicSkeleton({ baseWidth, additionalWidth, className }: DynamicSkeletonProps) {
  const width = useMemo(() => {
    const widthString = typeof baseWidth === "number" ? `${baseWidth}px` : baseWidth;
    const additionalWidthString = typeof additionalWidth === "number" ? `${additionalWidth}px` : additionalWidth;
    const calculatedWidth = `calc(${widthString} + ${Math.random()} * ${additionalWidthString} - ${additionalWidthString} / 2)`;
    return calculatedWidth;
  }, [baseWidth, additionalWidth]);

  return <Skeleton className={cn("!bg-accent h-6", className)} style={{ width }} />;
}

export default DynamicSkeleton;

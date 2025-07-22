import { Skeleton } from "@/components/ui/skeleton";

function EditorSkeleton() {
  return (
    <div className="editor-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-44 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="float-right h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorSkeleton;

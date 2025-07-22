import { RefreshCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

function ServerError({ retry }: { retry: () => void }) {
  return (
    <div className="my-auto py-8 text-center">
      <div className="bg-destructive/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <TriangleAlert className="text-destructive size-6" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-900">Service Unavailable</h1>
        <p className="text-sm text-gray-600">
          We're having trouble connecting to our servers. This might be temporary.
        </p>
      </div>

      <div className="pt-4">
        <Button className="w-full max-w-md gap-4" onClick={retry}>
          <RefreshCcw />
          Try Again
        </Button>

        <div className="space-y-1 pt-3 text-xs text-gray-500">
          <p className="!mb-0">If this persists:</p>
          <ul className="space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Contact support if the issue continues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ServerError;

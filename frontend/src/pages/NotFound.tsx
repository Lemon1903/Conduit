import { Link } from "react-router";

import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-6 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-muted-foreground !text-8xl !font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground mx-auto max-w-md">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted,
            or you entered the wrong URL.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

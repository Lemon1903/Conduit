import NothingFound from "@/assets/nothing-found.png";
import { Button } from "@/components/ui/button";

interface NoResultsFoundProps {
  message?: string;
  onPageChange?: (page: number) => void;
}

function NoResultsFound({ message = "No Results Found", onPageChange }: NoResultsFoundProps) {
  return (
    <div className="my-16 grid place-items-center">
      <img src={NothingFound} alt="empty results" className="size-32" />
      <div className="mx-auto max-w-96 text-center text-lg">{message}</div>
      {onPageChange && (
        <Button className="!mt-4" onClick={() => onPageChange(1)}>
          Go back to page 1
        </Button>
      )}
    </div>
  );
}

export default NoResultsFound;

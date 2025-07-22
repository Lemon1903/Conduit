import { Link } from "react-router";

import { cn } from "@/lib/utils";

interface TagProps {
  tag: string;
  className?: string;
}

function Tag({ tag, className }: TagProps) {
  function getTagUrl(tag: string) {
    const params = new URLSearchParams();
    params.set("tag", tag);
    return `?${params.toString()}`;
  }

  return (
    <Link to={getTagUrl(tag)} className={cn("tag-pill tag-default", className)}>
      {tag}
    </Link>
  );
}

export default Tag;

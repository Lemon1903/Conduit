import { Link } from "react-router";

import ProfilePicture from "@/components/shared/ProfilePicture";
import { getFormattedDate } from "@/lib/utils";
import type { IUser } from "@/types";

interface AuthorMetaProps {
  author: IUser;
  created_at: string;
}

function AuthorMeta({ author, created_at }: AuthorMetaProps) {
  return (
    <div className="inline-flex items-center align-middle">
      <Link to={`/profile/${author.username}`}>
        <ProfilePicture imageUrl={author.image} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{getFormattedDate(created_at)}</span>
      </div>
    </div>
  );
}

export default AuthorMeta;

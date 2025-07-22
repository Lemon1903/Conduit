import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_IMAGE_URL } from "@/constants";
import { cn, getImageUrl } from "@/lib/utils";

interface ProfilePictureProps extends Omit<React.ComponentProps<"img">, "src"> {
  imageUrl?: string | null;
}

function ProfilePicture({ imageUrl, className, ...props }: ProfilePictureProps) {
  return (
    <Avatar className={cn("size-8 overflow-hidden rounded-full", className)}>
      <AvatarImage src={getImageUrl(imageUrl)} {...props} />
      <AvatarFallback>
        <img src={DEFAULT_IMAGE_URL} alt="default image happy face" />
      </AvatarFallback>
    </Avatar>
  );
}

export default ProfilePicture;

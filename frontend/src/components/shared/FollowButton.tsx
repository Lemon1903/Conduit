import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import useFollowMutation from "@/hooks/useFollowMutation";
import { cn } from "@/lib/utils";
import { userStore } from "@/stores/userStore";
import { useNavigate } from "react-router";

interface FollowButtonProps {
  username: string;
  isFollowing: boolean;
}

function FollowButton({ username, isFollowing }: FollowButtonProps) {
  const { user } = userStore();
  const navigate = useNavigate();
  const followMutation = useFollowMutation(isFollowing);

  function handleFollowClick() {
    if (!user) {
      navigate("/login");
      return;
    }
    followMutation.mutate(username);
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(isFollowing && "!bg-background !text-foreground")}
      onClick={handleFollowClick}
    >
      {isFollowing ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
      {isFollowing ? "Unfollow" : "Follow"} {username}
      {/* <span className="counter">(10)</span> */}
    </Button>
  );
}

export default FollowButton;

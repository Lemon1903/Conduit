import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import * as z from "zod/v4";

import AuthorMeta from "@/components/shared/AuthorMeta";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useCreateUpdateCommentMutation from "@/hooks/useCreateUpdateCommentMutation";
import { deleteComment } from "@/lib/api";
import { getCommentsQueryOptions } from "@/lib/options";
import commentSchema from "@/schemas/commentSchema";
import { userStore } from "@/stores/userStore";
import type { IComment } from "@/types";

function Comment({ comment }: { comment: IComment }) {
  const { slug } = useParams<{ slug: string }>();
  const { user } = userStore();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const updateComment = useCreateUpdateCommentMutation(slug || "", comment.id);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: comment.body,
    },
  });

  async function handleDelete() {
    try {
      await deleteComment(slug || "", comment.id);
      await queryClient.invalidateQueries(getCommentsQueryOptions(slug || ""));
      return {
        error: false,
        message: "Comment deleted successfully",
      };
    } catch {
      return {
        error: true,
        message: "Failed to delete comment. Please try again.",
      };
    }
  }

  function handleSubmit(values: z.infer<typeof commentSchema>) {
    updateComment.mutate(values.body, {
      onSettled: () => {
        setIsEditing(false);
      },
    });
  }

  return (
    <div className="card">
      <div className="card-block">
        {!isEditing ? (
          <p className="card-text">{comment.body}</p>
        ) : (
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write a comment..."
                        className="focus-visible:!aria-invalid:ring-0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
      <div className="card-footer">
        <AuthorMeta author={comment.author} created_at={comment.created_at} />
        {comment.updated_at !== comment.created_at && (
          <span className="ml-2 align-middle text-xs text-gray-500">(edited)</span>
        )}
        {isEditing && (
          <Button
            className="float-right"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={updateComment.isPending}
          >
            {updateComment.isPending ? "Saving..." : "Save"}
          </Button>
        )}
        {!isEditing && comment.author.username === user?.username && (
          <div className="float-right inline-flex gap-1 align-middle">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="size-3.5" />
            </Button>
            <ActionButton
              action={handleDelete}
              variant="outline"
              size="icon"
              className="!border-destructive !text-destructive hover:!bg-destructive size-8"
              requireAreYouSure
              areYouSureDescription="Are you sure you want to delete this comment?"
            >
              <Trash className="size-3.5" />
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;

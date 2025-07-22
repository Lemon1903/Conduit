import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import * as z from "zod/v4";

import Comment from "@/components/Comment";
import ProfilePicture from "@/components/shared/ProfilePicture";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useCreateUpdateCommentMutation from "@/hooks/useCreateUpdateCommentMutation";
import { getCommentsQueryOptions } from "@/lib/options";
import commentSchema from "@/schemas/commentSchema";
import { userStore } from "@/stores/userStore";

function CommentsSection() {
  const { slug } = useParams<{ slug: string }>();

  const { user } = userStore();
  const { data: comments } = useQuery(getCommentsQueryOptions(slug || ""));

  const createCommentMutation = useCreateUpdateCommentMutation(slug || "");

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });

  function handleSubmit(values: z.infer<typeof commentSchema>) {
    createCommentMutation.mutate(values.body, {
      onSettled: () => form.reset(),
    });
  }

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {!user ? (
          <div className="mb-12 text-center">
            Want to write your thoughts? <Link to="/login">Log in</Link> or{" "}
            <Link to="/register">sign up</Link> to post a comment.
          </div>
        ) : (
          <Form {...form}>
            <form className="card comment-form" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="card-block gap-0">
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
              <div className="card-footer">
                <ProfilePicture
                  imageUrl={user.image}
                  alt={user.username}
                  className="comment-author-img inline-block align-middle"
                />
                <Button type="submit" size="sm" disabled={createCommentMutation.isPending}>
                  {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;

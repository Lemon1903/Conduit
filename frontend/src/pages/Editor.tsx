import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import * as z from "zod/v4";

import { RichTextEditor } from "@/components/blocks/editor-00/editor";
import EditorSkeleton from "@/components/EditorSkeleton";
import { Button } from "@/components/ui/button";
import CustomCreatableSelect from "@/components/ui/creatable-select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateUpdateArticleMutation from "@/hooks/useCreateUpdateArticleMutation";
import { getArticleQueryOptions, getTagsQueryOptions } from "@/lib/options";
import { cn } from "@/lib/utils";
import articleSchema from "@/schemas/articleSchema";
import type { IArticle } from "@/types";
import { $getRoot, type EditorState } from "lexical";
import { useEffect, useState } from "react";

const emptyMessage: { [key: string]: string } = {
  pending: "Loading tags...",
  error: "Error loading tags",
};

function getValues(article?: IArticle | null) {
  return {
    title: article?.title ?? "",
    description: article?.description ?? "",
    body: article?.body ?? "",
    tags: article?.tags ?? [],
  };
}

function Editor() {
  const { slug } = useParams();

  // prettier-ignore
  const { data: article, status, error, fetchStatus } = useQuery(
    getArticleQueryOptions(slug, { enabled: !!slug })
  );
  const { data: tags, status: tagStatus } = useQuery(getTagsQueryOptions());

  const [resetCount, setResetCount] = useState(0);

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: getValues(article),
  });

  const createUpdateMutation = useCreateUpdateArticleMutation(slug);

  useEffect(() => {
    form.reset(getValues(article));
    setResetCount((prev) => prev + 1);
  }, [slug, article]);

  if (status === "pending" && fetchStatus === "fetching") {
    return <EditorSkeleton />;
  }

  if (error) {
    return <div>Error loading article: {error.message}</div>;
  }

  function evaluateBody(state: EditorState) {
    let isEmpty = true;

    state.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      isEmpty = textContent.trim() === "";
    });

    if (isEmpty) return "";

    return JSON.stringify(state.toJSON());
  }

  function transformTags(tags?: Array<string>) {
    return tags?.map((tag) => ({ label: tag, value: tag }));
  }

  function handleSubmit(values: z.infer<typeof articleSchema>) {
    createUpdateMutation.mutate(values);
  }

  return (
    <div className="editor-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="form-control-lg" placeholder="Article Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="What's this article about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditor
                          // Need this to force unmount the Lexical Editor on every render
                          key={`${slug || "new"}-${resetCount}`}
                          editorSerializedState={
                            createUpdateMutation.variables &&
                            createUpdateMutation.variables.body !== ""
                              ? JSON.parse(createUpdateMutation.variables.body)
                              : field.value !== ""
                                ? JSON.parse(field.value)
                                : undefined
                          }
                          onChange={(editorState) => field.onChange(evaluateBody(editorState))}
                          containerClassName={cn(
                            fieldState.error && "ring-[3px] ring-destructive/20",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomCreatableSelect
                          isMulti
                          options={transformTags(tags)}
                          placeholder="Enter tags"
                          noOptionsMessage={() => emptyMessage[tagStatus] || "No tags found"}
                          {...field}
                          value={transformTags(field.value)}
                          onChange={(value) => field.onChange(value.map((v) => v.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="float-right"
                  disabled={createUpdateMutation.status === "pending"}
                >
                  {createUpdateMutation.status === "pending" ? "Publishing" : "Publish"} Article
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
